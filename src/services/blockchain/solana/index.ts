import {
    Cluster,
    Connection,
    Keypair,
    PublicKey,
    clusterApiUrl,
} from "@solana/web3.js"
import { computeDenomination } from "@/utils"
import { TokenAddress } from "@wormhole-foundation/sdk"
import { SolanaChains } from "@wormhole-foundation/sdk-solana"
import { getSeed } from "@/services/cryptography"
import { ChainAccount, TokenMetadata, Network } from "../common"

export const createSolanaAccount = (
    mnemonic: string,
    accountNumber: number
): ChainAccount => {
    const seed = getSeed({
        mnemonic,
        accountNumber,
    })
    const account = Keypair.fromSeed(seed.subarray(0, 32))
    return {
        address: account.publicKey.toString(),
        privateKey: Buffer.from(account.secretKey).toString("hex"),
        publicKey: account.publicKey.toString(),
    }
}

export const solanaClient = (network: Network = Network.Testnet) => {
    const networkMap: Record<Network, Cluster> = {
        [Network.Devnet]: "devnet",
        [Network.Mainnet]: "mainnet-beta",
        [Network.Testnet]: "devnet",
    }
    return new Connection(clusterApiUrl(networkMap[network]), {
        commitment: "confirmed",
    })
}

export const getSolanaBalance = async (
    accountAddress: string,
    tokenAddress: string,
    network: Network = Network.Testnet
) => {
    switch (tokenAddress) {
    case "native": {
        const amount = await solanaClient(network).getBalance(
            new PublicKey(accountAddress)
        )
        return computeDenomination(amount, 9)
    }
    default: {
        if (accountAddress === "") return
        const result = await solanaClient(network).getParsedTokenAccountsByOwner(
            new PublicKey(accountAddress),
            {
                mint: new PublicKey(tokenAddress),
            }
        )
        return result.value[0].account.data.parsed.info.tokenAmount.uiAmount
    }
    }
}

export const solanaExplorerUrls = (
    value: string,
    network: Network = Network.Testnet
) => {
    switch (network) {
    case Network.Devnet:
        return {
            address: `https://explorer.solana.com/address/${value}?cluster=devnet`,
            tx: `https://explorer.solana.com/tx/${value}?cluster=devnet`,
        }
    case Network.Testnet:
        return {
            address: `https://explorer.solana.com/address/${value}?cluster=devnet`,
            tx: `https://explorer.solana.com/tx/${value}?cluster=devnet`,
        }
    case Network.Mainnet:
        return {
            address: `https://explorer.solana.com/address/${value}`,
            tx: `https://explorer.solana.com/tx/${value}`,
        }
    }
}

export const getSolanaTokenMetadata = async (
    tokenAddress: TokenAddress<SolanaChains>,
    network: Network = Network.Testnet
): Promise<TokenMetadata> => {
    return {
        decimals: 9,
        name: "Solana",
        symbol: "SOL",
    }
}
