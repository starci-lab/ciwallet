import { useAppSelector } from "@/redux"
import { aptosSigner, evmSigner, solanaSigner } from "@/services"
import { Chain, SignAndSendSigner, Network } from "@wormhole-foundation/sdk"

export const useSigner = <N extends Network, C extends Chain>(
    chainKey: string
): SignAndSendSigner<N, C> | undefined => {
    const network = useAppSelector((state) => state.chainReducer.network)
    const credential = useAppSelector(
        (state) => state.chainReducer.credentials[chainKey]
    )

    if (
        credential.privateKey === "" ||
    credential.publicKey === "" ||
    credential.address === ""
    )
        return

    switch (chainKey) {
    case "aptos": {
        return aptosSigner({
            chain: "Aptos",
            network,
            privateKey: credential.privateKey,
            address: credential.address,
            debug: true,
        }) as unknown as SignAndSendSigner<N, C>
    }
    case "solana": {
        return solanaSigner({
            chain: "Solana",
            network,
            privateKey: credential.privateKey,
            debug: true,
        }) as unknown as SignAndSendSigner<N, C>
    }
    case "bsc": {
        return evmSigner({
            chain: "Bsc",
            network,
            privateKey: credential.privateKey,
            debug: true,
        }) as unknown as SignAndSendSigner<N, C>
    }
    }
}
