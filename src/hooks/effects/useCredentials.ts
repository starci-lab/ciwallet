import { setCredential, useAppDispatch, useAppSelector } from "@/redux"
import {
    createAptosAccount,
    createSolanaAccount,
    createEvmAccount,
} from "@/services"
import { useEffect } from "react"

export const useCredentials = () => {
    const { mnemonic, accountNumbers } = useAppSelector(
        (state) => state.authReducer
    )
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!mnemonic) return
        const account = createAptosAccount(
            mnemonic,
            accountNumbers.aptos.activeAccountNumber
        )

        dispatch(
            setCredential({
                account,
                chainKey: "aptos",
            })
        )
    }, [mnemonic, accountNumbers.aptos])

    useEffect(() => {
        if (!mnemonic) return
        const account = createSolanaAccount(
            mnemonic,
            accountNumbers.solana.activeAccountNumber
        )
        dispatch(
            setCredential({
                account,
                chainKey: "solana",
            })
        )
    }, [mnemonic, accountNumbers.solana])

    useEffect(() => {
        if (!mnemonic) return
        const account = createEvmAccount(
            mnemonic,
            accountNumbers.bsc.activeAccountNumber
        )
        dispatch(
            setCredential({
                account,
                chainKey: "bsc",
            })
        )
    }, [mnemonic, accountNumbers.bsc])
}
