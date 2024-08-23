import { Network } from "@wormhole-foundation/sdk"
import {
    SolanaChains,
    SolanaSendSigner,
} from "@wormhole-foundation/sdk-solana"
import { Network as SupportedNetwork } from "../../common"
import { SignerParams } from "../base.wormhole"
import { solanaClient as _solanaClient } from "../../solana"
import { Connection, Keypair } from "@solana/web3.js"

export const solanaSigner = ({
    privateKey,
    network,
    chain,
    debug,
}: SignerParams<Network, SolanaChains>) => {
    const keypair = Keypair.fromSecretKey(
        new Uint8Array(Buffer.from(privateKey, "hex"))
    )
    let solanaClient: Connection
    switch (network) {
    case "Testnet": {
        solanaClient = _solanaClient(SupportedNetwork.Devnet)
        break
    }
    case "Mainnet": {
        solanaClient = _solanaClient(SupportedNetwork.Mainnet)
        break
    }
    default: {
        throw new Error("Devnet is not supported")
    }
    }
    return new SolanaSendSigner(solanaClient, chain, keypair, debug ?? false, {})
}
