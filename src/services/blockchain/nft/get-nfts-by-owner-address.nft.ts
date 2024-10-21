
import { Contract, JsonRpcProvider } from "ethers"
import { algorandAlgodClient, aptosClient, evmHttpRpcUrl, solanaHttpRpcUrl } from "../rpcs"
import { erc721Abi } from "../abis"
import { Network } from "@/config"
import { Platform, chainKeyToPlatform } from "../common"
import { MulticallProvider } from "@ethers-ext/provider-multicall"
import { AlgorandMetadata, NftData } from "./common"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { fetchAllDigitalAssetByOwner } from "@metaplex-foundation/mpl-token-metadata"
import { isSome, publicKey } from "@metaplex-foundation/umi"
import { CIDService } from "../../ipfs"

export interface GetNftsByOwnerAddressParams {
    accountAddress: string,
    nftAddress: string,
    chainKey: string,
    network?: Network
    skip: number
    take: number
}

export interface GetNftsByOwnerAddressServices {
    cidService?: CIDService
}

export interface GetNftsByOwnerAddressResult {
    records: Array<NftData>,
    count: number
}

export const _getEvmNftsByOwnerAddress = async ({
    nftAddress,
    chainKey,
    network,
    accountAddress,
    skip,
    take,
}: GetNftsByOwnerAddressParams): Promise<GetNftsByOwnerAddressResult> => {
    network = network || Network.Testnet
    const rpc = evmHttpRpcUrl(chainKey, network)
    const provider = new JsonRpcProvider(rpc)
    const contract = new Contract(nftAddress, erc721Abi, provider)
    const balance = Number(
        await contract.getFunction("balanceOf").staticCall(accountAddress),
    )
    const multicaller = new MulticallProvider(provider)
    const multicallerContract = new Contract(nftAddress, erc721Abi, multicaller)

    const promises: Array<Promise<void>> = []
    const tokenIds: Array<string> = []
    for (
        let index = skip || 0;
        index < (take ? Math.min(balance, (skip || 0) + take) : balance);
        index++
    ) {
        promises.push(
            (async () => {
                const tokenId = await multicallerContract
                    .getFunction("tokenOfOwnerByIndex")
                    .staticCall(accountAddress, index)
                tokenIds.push(String(tokenId))
            })(),
        )
    }
    await Promise.all(promises)

    const records: Array<NftData> = []
    for (const tokenId of tokenIds) {
        promises.push(
            (async () => {
                const tokenURI = await multicallerContract
                    .getFunction("tokenURI")
                    .staticCall(tokenId)
                records.push({
                    tokenId,
                    tokenURI,
                    ownerAddress: accountAddress
                })
            })(),
        )
    }
    await Promise.all(promises)

    return {
        count: balance,
        records,
    }
}

export const _getSolanaNftsByOwnerAddress = async ({
    nftAddress,
    chainKey,
    network,
    accountAddress,
    skip,
    take,
}: GetNftsByOwnerAddressParams): Promise<GetNftsByOwnerAddressResult> => {
    network = network || Network.Testnet

    const rpc = solanaHttpRpcUrl(chainKey, network)
    const umi = createUmi(rpc)
    console.log(nftAddress)
    let nfts = await fetchAllDigitalAssetByOwner(umi, publicKey(accountAddress))
    nfts = nfts.filter(nft => {
        if (isSome(nft.metadata.collection)) {
            console.log(nft.metadata.collection)
            return nft.metadata.collection.value.key.toString() === nftAddress
        }
        return false
    })
    
    const records: Array<NftData> = nfts.map(nft => ({
        tokenId: nft.metadata.mint.toString(),
        tokenURI: nft.metadata.uri,
        ownerAddress: accountAddress,
    })).slice(skip, take)
    return {
        records,
        count: nfts.length
    }
}

export const _getAptosNftsByOwnerAddress = async ({
    nftAddress,
    network,
    accountAddress,
    skip,
    take,
}: GetNftsByOwnerAddressParams): Promise<GetNftsByOwnerAddressResult> => {
    network = network || Network.Testnet
    const client = aptosClient(network)

    let nfts = await client.getAccountOwnedTokensFromCollectionAddress({
        accountAddress,
        collectionAddress: nftAddress,
    })
    nfts = nfts.slice(skip, take)

    const promises: Array<Promise<void>> = []
    const records: Array<NftData> = []

    for (const nft of nfts) {
        const promise = async () => {
            const digitalAsset = await client.getDigitalAssetData({
                digitalAssetAddress: nft.token_data_id,
            })
            records.push({
                ownerAddress: accountAddress,
                tokenId: nft.token_data_id,
                tokenURI: digitalAsset.token_uri,
            })
        }
        promises.push(promise())
    }
    await Promise.all(promises)
    return {
        records,
        count: nfts.length
    }
}

export const _getAlgorandNftsByOwnerAddress = async ({
    nftAddress,
    network,
    accountAddress,
    skip,
    take,
}: GetNftsByOwnerAddressParams, { cidService } : GetNftsByOwnerAddressServices): Promise<GetNftsByOwnerAddressResult> => {
    network = network || Network.Testnet
    const client = algorandAlgodClient(network)
    const accountInfo = await client.accountInformation(accountAddress).do()
    const nfts: Array<NftData> = []
    
    const promises: Array<Promise<void>> = []
    for (const asset of accountInfo.assets || []) {
        const promise = async () => {
            if (!cidService) throw new Error("CID Service not found")
            const { params } = await client.getAssetByID(asset.assetId).do()
            if (params.reserve) {
                const cid = cidService.algorandReserveAddressToCid(params.reserve)
                const data = await cidService.getCidContent(cid) as AlgorandMetadata
                if (data !== null && data.collection.id === nftAddress) {
                    nfts.push({
                        ownerAddress: accountAddress,
                        tokenId: asset.assetId.toString(),
                        tokenURI: data.image,
                    })
                }
            }          
        }
        promises.push(promise())
    } 
    await Promise.all(promises)
    const records = nfts.slice(skip ? skip : undefined, take ? take : undefined)

    return {
        records,
        count: nfts.length,
    }
}
export const _getNftsByOwnerAddress = (params: GetNftsByOwnerAddressParams, services: GetNftsByOwnerAddressServices) => {
    const platform = chainKeyToPlatform(params.chainKey)
    switch (platform) {
    case Platform.Evm: {
        return _getEvmNftsByOwnerAddress(params)
    }
    case Platform.Solana: {
        return _getSolanaNftsByOwnerAddress(params)
    }
    case Platform.Aptos: {
        return _getAptosNftsByOwnerAddress(params)
    }
    case Platform.Algorand: {
        return _getAlgorandNftsByOwnerAddress(params, services)
    }
    default:
        throw new Error("Platform not found")
    }
}
