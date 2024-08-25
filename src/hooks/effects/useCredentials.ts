import {
    setCredential,
    useAppDispatch,
    useAppSelector,
} from "@/redux"
import { createAptosAccount, createSolanaAccount } from "@/services"
import { useEffect } from "react"

export const useCredentials = () => {
    const { mnemonic, accountNumbers } = useAppSelector(
        (state) => state.authReducer
    )
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!mnemonic) return
        const account = createAptosAccount({
            mnemonic,
            accountNumber: accountNumbers.aptos.activeAccountNumber,
        })

        dispatch(
            setCredential({
                account,
                chainKey: "aptos",
            })
        )
    }, [mnemonic, accountNumbers.aptos])

    useEffect(() => {
        if (!mnemonic) return
        const account = createSolanaAccount({
            mnemonic,
            accountNumber: accountNumbers.solana.activeAccountNumber,
        })
        dispatch(
            setCredential({
                account,
                chainKey: "solana",
            })
        )
    }, [mnemonic, accountNumbers.solana])
}
