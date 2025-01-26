export * from "./aptos"
export * from "./solana"
export * from "./evm"
import {
    Chain,
    Network as WormholeNetwork,
    chainToPlatform,
} from "@wormhole-foundation/sdk"
import { SignerParams } from "../base"
import { evmSigner } from "./evm"
import { EvmChains } from "@wormhole-foundation/sdk-evm"
import { AptosChains } from "@wormhole-foundation/sdk-aptos"
import { aptosSigner } from "./aptos"
import { solanaSigner } from "./solana"
import { SolanaChains } from "@wormhole-foundation/sdk-solana"
import { AlgorandChains } from "@wormhole-foundation/sdk-algorand"
import { algorandSigner } from "./algorand"

export const signer = (params: SignerParams<WormholeNetwork, Chain>) => {
    const platform = chainToPlatform(params.chain)
    switch (platform) {
    case "Evm":
        return evmSigner(params as SignerParams<WormholeNetwork, EvmChains>)
    case "Aptos":
        return aptosSigner(params as SignerParams<WormholeNetwork, AptosChains>)
    case "Solana":
        return solanaSigner(
        params as SignerParams<WormholeNetwork, SolanaChains>
        )
    case "Algorand": 
        return algorandSigner(params as SignerParams<WormholeNetwork, AlgorandChains>)
    }}
