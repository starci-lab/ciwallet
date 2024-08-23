import { Cluster, Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js"
import { Network, getSeed,  } from "@/services"
import { computeDenomination } from "@/utils"

export interface CreateSolanaAccountParams {
    mnemonic: string;
    accountNumber: number;
  }
  
export const createSolanaAccount = ({
    mnemonic,
    accountNumber
}: CreateSolanaAccountParams) => {
    const seed = getSeed({
        mnemonic,
        accountNumber,
    })
    return Keypair.fromSeed(
        seed.subarray(0, 32)
    )
}

export const solanaClient = (network: Network = Network.Testnet) =>
{
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
    address: string,
    network: Network = Network.Testnet
) => {
    const amount = await solanaClient(network).getBalance(new PublicKey(address))
    return computeDenomination(amount, 9)
}
    

