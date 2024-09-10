import { setCredential, useAppDispatch, useAppSelector } from "@/redux"
import {
    createAccount
} from "@/services"
import { useEffect } from "react"

export const useCredentials = () => {
    const { mnemonic, accountNumbers } = useAppSelector(
        (state) => state.authReducer
    )
    const dispatch = useAppDispatch()

    const aptosChainKey = "aptos"
    const solanaChainKey = "solana"
    const bscChainKey = "bsc"
    const avalanacheChainKey = "avalanche"

    useEffect(() => {
        if (!mnemonic) return
        const account = createAccount(
            {
                chainKey:  aptosChainKey,
                mnemonic,
                accountNumber: accountNumbers[aptosChainKey].activeAccountNumber,
            }
        )

        dispatch(
            setCredential({
                account,
                chainKey: aptosChainKey,
            })
        )
    }, [mnemonic, accountNumbers[aptosChainKey]])

    useEffect(() => {
        if (!mnemonic) return
        const account = createAccount(
            {
                chainKey: solanaChainKey,
                mnemonic,
                accountNumber: accountNumbers[solanaChainKey].activeAccountNumber,
            }
        )
        dispatch(
            setCredential({
                account,
                chainKey: solanaChainKey,
            })
        )
    }, [mnemonic, accountNumbers[solanaChainKey]])

    useEffect(() => {
        if (!mnemonic) return
        const account = createAccount({
            chainKey: avalanacheChainKey,
            mnemonic,
            accountNumber: accountNumbers[avalanacheChainKey].activeAccountNumber,
        }
        )
        dispatch(
            setCredential({
                account,
                chainKey: avalanacheChainKey,
            })
        )
    }, [mnemonic, accountNumbers[avalanacheChainKey]])

    useEffect(() => {
        if (!mnemonic) return
        const account = createAccount({
            chainKey: bscChainKey,
            mnemonic,
            accountNumber: accountNumbers[bscChainKey].activeAccountNumber,
        }
        )
        dispatch(
            setCredential({
                account,
                chainKey: avalanacheChainKey,
            })
        )
    }, [mnemonic, accountNumbers[bscChainKey]])
}
