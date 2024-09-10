import { Chain, UniversalAddress, chainToPlatform, toUniversal } from "@wormhole-foundation/sdk"
import { AptosAddress } from "@wormhole-foundation/sdk-aptos"
import { SolanaAddress } from "@wormhole-foundation/sdk-solana"

export const getUniversalAddress = (
    chain: Chain,
    address: string
): UniversalAddress => {
    if (address === "native") throw new Error("Native address do not have universal address")
    const platform = chainToPlatform(chain)
    switch (platform) {
    case "Solana":
        return new SolanaAddress(address).toUniversalAddress()
    case "Aptos":
        return new AptosAddress(address).toUniversalAddress()
    case "Evm":
        return toUniversal(chain, address)
    default: throw new Error("Invalid platform")
    }
}

    