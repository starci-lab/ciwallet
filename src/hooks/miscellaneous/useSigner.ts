import { useAppSelector } from "@/redux"
import { chainKeyToChain, parseNetwork, signer } from "@/services"
import { Chain, SignAndSendSigner, Network } from "@wormhole-foundation/sdk"

export const useSigner = <N extends Network, C extends Chain>(
    chainKey: string
): SignAndSendSigner<N, C> | undefined => {
    const network = useAppSelector((state) => state.blockchainReducer.network)
    const credential = useAppSelector(
        (state) => state.blockchainReducer.credentials[chainKey]
    )
    if (!credential) return
    if (
        credential.privateKey === "" ||
    credential.publicKey === "" ||
    credential.address === ""
    )
        return

    const chain = chainKeyToChain(chainKey)
    return signer({
        chain,
        network: parseNetwork(network),
        privateKey: credential.privateKey,
        address: credential.address,
        debug: true,
    }) as unknown as SignAndSendSigner<N, C>
}
