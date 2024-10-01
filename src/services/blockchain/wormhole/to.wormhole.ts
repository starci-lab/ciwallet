import { Chain, chainToPlatform, TokenAddress, UniversalAddress } from "@wormhole-foundation/sdk"
import { AptosAddress } from "@wormhole-foundation/sdk-aptos"
import { EvmAddress } from "@wormhole-foundation/sdk-evm"
import { SolanaAddress } from "@wormhole-foundation/sdk-solana"
import { AlgorandAddress } from "@wormhole-foundation/sdk-algorand"

export const toWormholeNative = <C extends Chain>(
    chain: C,
    tokenAddress: TokenAddress<C>
) => {
    const platform = chainToPlatform(chain)
    let address = ""
    switch (platform) {
    case "Evm": {
        address = new EvmAddress(tokenAddress.toString()).toNative().address
        break
    }
    case "Solana": {
        address = new SolanaAddress(tokenAddress.toString()).toNative().address.toBase58()
        break
    }
    case "Aptos": {
        address = new AptosAddress(tokenAddress.toString()).toNative().toString()
        break
    }
    case "Algorand": {
        address = new AlgorandAddress(tokenAddress.toString()).toNative().toInt().toString()
        break
    }
    default: {
        throw new Error("Unsupported platform")
    }
    }
    return address
}

export const toWormholeUniversal = <C extends Chain>(
    chain: C,
    tokenAddress: string
) => {
    const platform = chainToPlatform(chain)
    let address : UniversalAddress 
    switch (platform) {
    case "Evm": {
        address = new EvmAddress(tokenAddress).toUniversalAddress()
        break
    }
    case "Solana": {
        address = new SolanaAddress(tokenAddress).toUniversalAddress()
        break
    }
    case "Aptos": {
        address = new AptosAddress(tokenAddress).toUniversalAddress()
        break
    }
    case "Algorand": {
        address = new AlgorandAddress(tokenAddress).toUniversalAddress()
        break
    }
    default: {
        throw new Error("Unsupported platform")
    }
    }
    return address
}
