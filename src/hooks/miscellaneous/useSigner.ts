import { useAppSelector } from "@/redux"
import { aptosSigner, solanaSigner } from "@/services"
import { Chain, SignAndSendSigner, Network } from "@wormhole-foundation/sdk"

export const useSigner = <N extends Network, C extends Chain>(chainKey: string) : SignAndSendSigner<N, C> | undefined => {
    const aptosCredential = useAppSelector(
        (state) => state.chainReducer.aptos.credential
    )
    const solanaCredential = useAppSelector(
        (state) => state.chainReducer.solana.credential
    )

    const network = useAppSelector((state) => state.chainReducer.network)

    const map : Record<string, SignAndSendSigner<N, C> | undefined> = {
        aptos: aptosCredential.privateKey ? aptosSigner({
            chain: "Aptos",
            network,
            privateKey: aptosCredential.privateKey,
            address: aptosCredential.address,
            debug: true
        }) as unknown as SignAndSendSigner<N, C> : undefined,
        
        solana: solanaCredential.privateKey ? solanaSigner({
            chain: "Solana",
            network,
            privateKey: solanaCredential.privateKey,
            debug: true
        }) as unknown as SignAndSendSigner<N, C> : undefined,
    }
    return map[chainKey]
}