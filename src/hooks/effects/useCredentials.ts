import {
    setAptosCredential,
    setSolanaCredential,
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
        const credentials = createAptosAccount({
            mnemonic,
            accountNumber: accountNumbers.aptos.activeAccountNumber,
        })

        dispatch(
            setAptosCredential(credentials)
        )
    }, [mnemonic, accountNumbers.aptos])

    useEffect(() => {
        if (!mnemonic) return
        const credentials = createSolanaAccount({
            mnemonic,
            accountNumber: accountNumbers.solana.activeAccountNumber,
        })
        dispatch(
            setSolanaCredential(credentials)
        )
    }, [mnemonic, accountNumbers.solana])
}
