import { blockchainConfig, Network } from "@/config"
import { algorandClient, aptosClient, evmHttpRpcUrl, solanaHttpRpcUrl } from "../rpcs"
import { Contract, JsonRpcProvider, Wallet } from "ethers"
import { erc20Abi } from "../abis"
import { computeRaw } from "@/utils"
import { mplTokenMetadata, fetchDigitalAsset } from "@metaplex-foundation/mpl-token-metadata"
import { keypairIdentity, publicKey, sol } from "@metaplex-foundation/umi"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import {
    findAssociatedTokenPda,
    transferTokens,
    transferSol
} from "@metaplex-foundation/mpl-toolbox"
import { base58 } from "@metaplex-foundation/umi/serializers"
import { Account, Ed25519PrivateKey } from "@aptos-labs/ts-sdk"
import { APTOS_COIN } from "aptos"
import { makePaymentTxnWithSuggestedParamsFromObject, secretKeyToMnemonic, mnemonicToSecretKey, waitForConfirmation, makeAssetTransferTxnWithSuggestedParamsFromObject } from "algosdk"
import { chainKeyToPlatform, Platform } from "../common"

export interface TransferParams {
  chainKey: string;
  tokenAddress: string;
  network?: Network;
  privateKey: string;
  recipientAddress: string;
  amount: number;
  fromAddress?: string;
}

export interface TransferResult {
  txHash: string;
}

export const _transferEvm = async ({
    chainKey,
    tokenAddress,
    network,
    privateKey,
    recipientAddress,
    amount,
}: TransferParams): Promise<TransferResult> => {
    if (!tokenAddress)
        throw new Error("Cannot find balance without token address")
    network = network || Network.Testnet

    const rpcUrl = evmHttpRpcUrl(chainKey, network)
    const provider = new JsonRpcProvider(rpcUrl)
    const wallet = new Wallet(privateKey, provider)

    if (tokenAddress === "native") {
        const { decimals } = blockchainConfig().chains[chainKey].tokens["native"]
        if (!decimals) throw new Error("decimals must not undefined")
        const { hash } = await wallet.sendTransaction({
            to: recipientAddress,
            from: wallet.address,
            value: computeRaw(amount, decimals),
        })
        await provider.waitForTransaction(hash)
        return { txHash: hash }
    } else {
        const contract = new Contract(tokenAddress, erc20Abi, wallet)
        const decimals = await contract.getFunction("decimals").staticCall()
        const { hash } = await contract
            .getFunction("transfer")
            .send(recipientAddress, computeRaw(amount, decimals))
        await provider.waitForTransaction(hash)
        return { txHash: hash }
    }
}

export const _transferSolana = async ({
    chainKey,
    tokenAddress,
    network,
    privateKey,
    recipientAddress,
    amount,
}: TransferParams): Promise<TransferResult> => {
    if (!tokenAddress)
        throw new Error("Cannot find balance without token address")
    network = network || Network.Testnet

    const recipientPublicKey = publicKey(recipientAddress)

    if (tokenAddress === "native") {
        const umi = createUmi(solanaHttpRpcUrl(chainKey, network)).use(mplTokenMetadata())
        const keypair = umi.eddsa.createKeypairFromSecretKey(Buffer.from(privateKey, "hex"))
        umi.use(keypairIdentity(keypair))

        const { signature } = await transferSol(umi, {
            source: umi.identity,
            destination: recipientPublicKey,
            amount: sol(amount),
        }).sendAndConfirm(umi)
        const txHash = base58.deserialize(signature)[0]

        return { txHash }
    } else {
        const umi = createUmi(solanaHttpRpcUrl(chainKey, network)).use(mplTokenMetadata())
        const asset = await fetchDigitalAsset(umi, publicKey(tokenAddress))

        const keypair = umi.eddsa.createKeypairFromSecretKey(Buffer.from(privateKey, "hex"))
        umi.use(keypairIdentity(keypair))

        const tokenPublicKey = publicKey(tokenAddress)

        const sourceTokenAccount = findAssociatedTokenPda(umi, {
            mint: tokenPublicKey,
            owner: umi.identity.publicKey,
        })

        const destinationTokenAccount = findAssociatedTokenPda(umi, {
            mint: tokenPublicKey,
            owner: recipientPublicKey,
        })
        const { signature } = await transferTokens(umi, {
            source: sourceTokenAccount,
            destination: destinationTokenAccount,
            amount: computeRaw(amount, asset.mint.decimals),
        }).sendAndConfirm(umi)
        const txHash = base58.deserialize(signature)[0]
        return { txHash }
    }
}

export const _transferAptos = async ({
    chainKey,
    tokenAddress,
    network,
    privateKey,
    recipientAddress,
    amount,
    fromAddress
}: TransferParams): Promise<TransferResult> => {
    if (!tokenAddress)
        throw new Error("Cannot find balance without token address")
    network = network || Network.Testnet

    const client = aptosClient(network)
    const account = Account.fromPrivateKey({
        privateKey: new Ed25519PrivateKey(privateKey),
        address: fromAddress,
    })

    if (tokenAddress === "native") {
        const { decimals } = blockchainConfig().chains[chainKey].tokens["native"]
        if (!decimals) throw new Error("decimals must not undefined")
        const transaction = await client.transferCoinTransaction({
            sender: account.accountAddress.toString(),
            recipient: recipientAddress,
            amount: computeRaw(amount, decimals),
            coinType: APTOS_COIN,
        })
        const { hash } = await client.signAndSubmitTransaction({
            transaction,
            signer: account,
        })
        return { txHash: hash }
    } else {
        const { decimals } = await client.getFungibleAssetMetadataByAssetType({
            assetType: tokenAddress,
        })
        const transaction = await client.transferCoinTransaction({
            sender: account.accountAddress.toString(),
            recipient: recipientAddress,
            amount: computeRaw(amount, decimals),
            coinType: tokenAddress as `${string}::${string}::${string}`,
        })
        const { hash } = await client.signAndSubmitTransaction({
            transaction,
            signer: account,
        })
        return { txHash: hash }
    }
}

export const _transferAlgorand = async ({
    chainKey,
    tokenAddress,
    network,
    privateKey,
    recipientAddress,
    amount,
}: TransferParams): Promise<TransferResult> => {
    if (!tokenAddress)
        throw new Error("Cannot find balance without token address")
    network = network || Network.Testnet
    
    const client = algorandClient(network)
    const mnemonic = secretKeyToMnemonic(Buffer.from(privateKey, "hex"))
    const account = mnemonicToSecretKey(mnemonic)

    if (tokenAddress === "native") {
        const { decimals } = blockchainConfig().chains[chainKey].tokens["native"]
        if (!decimals) throw new Error("decimals must not undefined")

        const suggestedParams = await client.getTransactionParams().do()
        const transaction = makePaymentTxnWithSuggestedParamsFromObject({
            sender: account.addr,
            suggestedParams,
            receiver: recipientAddress,
            amount: computeRaw(amount, decimals),
        })
        const signedTxn = transaction.signTxn(account.sk)
        const { txid } = await client.sendRawTransaction(signedTxn).do()
        await waitForConfirmation(client, txid, 3)
        return { txHash: txid }
    } else {
        const { decimals } = blockchainConfig().chains[chainKey].tokens["native"]
        if (!decimals) throw new Error("decimals must not undefined")

        const suggestedParams = await client.getTransactionParams().do()
        const transaction = makeAssetTransferTxnWithSuggestedParamsFromObject({
            sender: account.addr,
            suggestedParams,
            receiver: recipientAddress,
            assetIndex: parseInt(tokenAddress),
            assetSender: account.addr,
            amount: computeRaw(amount, decimals),
        })
        const signedTxn = transaction.signTxn(account.sk)
        const { txid } = await client.sendRawTransaction(signedTxn).do()
        await waitForConfirmation(client, txid, 3)
        return { txHash: txid }
    }
}

export const transferToken = async (params: TransferParams): Promise<TransferResult> => {
    const platform = chainKeyToPlatform(params.chainKey)
    switch (platform) {
    case Platform.Evm:
        return _transferEvm(params)
    case Platform.Aptos:
        return _transferAptos(params)
    case Platform.Solana:
        return _transferSolana(params)
    case Platform.Algorand:
        return _transferAlgorand(params)
    }
}