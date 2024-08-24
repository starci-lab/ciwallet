import { useAppSelector } from "@/redux"
import {
    aptosSigner,
    createAptosAccount,
    createSolanaAccount,
    solanaSigner,
} from "@/services"
import { Chain, SignAndSendSigner, Network } from "@wormhole-foundation/sdk"

export const useGenericSigner = <N extends Network, C extends Chain>(
    chainKey: string,
    address: string
): SignAndSendSigner<N, C> | undefined => {
    const mnemonic = useAppSelector((state) => state.authReducer.mnemonic)
    const network = useAppSelector((state) => state.chainReducer.network)
    const { aptos, solana } = useAppSelector(
        (state) => state.authReducer.accountNumbers
    )

    if (!mnemonic) return

    switch (chainKey) {
    case "aptos": {
        const { accounts: aptosAccounts } = aptos
        const aptosNumbers = Object.keys(aptosAccounts).map((key) => Number(key))
        const _aptosAccounts = aptosNumbers.map((accountNumber) =>
            createAptosAccount({
                mnemonic,
                accountNumber,
            })
        )
        const _aptosAccount = _aptosAccounts.find(
            (account) => account.accountAddress.toString() === address
        )
        if (!_aptosAccount) {
            console.warn(`Aptos account not found for ${address}` )
            return
        }
        return aptosSigner({
            chain: "Aptos",
            network,
            privateKey: _aptosAccount.privateKey.toString(),
            address: _aptosAccount.accountAddress.toString(),
            debug: true,
        }) as unknown as SignAndSendSigner<N, C>
    }
    case "solana": {
        const { accounts: solanaAccounts } = solana
        const solanaNumbers = Object.keys(solanaAccounts).map((key) =>
            Number(key)
        )
        const _solanaAccounts = solanaNumbers.map((accountNumber) =>
            createSolanaAccount({
                mnemonic,
                accountNumber,
            })
        )
        const _solanaAccount = _solanaAccounts.find(
            (account) => account.publicKey.toString() === address
        )
        if (!_solanaAccount) {
            console.warn(`Solana account not found for ${address}` )
            return
        }
        return solanaSigner({
            chain: "Solana",
            network,
            privateKey: Buffer.from(_solanaAccount.secretKey).toString("hex"),
            debug: true,
        }) as unknown as SignAndSendSigner<N, C>
    }
    }
}
