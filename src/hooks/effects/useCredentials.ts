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
        const { publicKey, privateKey, accountAddress } = createAptosAccount({
            mnemonic,
            accountNumber: accountNumbers.aptos.activeAccountNumber,
        })

        dispatch(
            setAptosCredential({
                address: accountAddress.toString(),
                publicKey: publicKey.toString(),
                privateKey: privateKey.toString(),
            })
        )
    }, [mnemonic, accountNumbers.aptos])

    useEffect(() => {
        if (!mnemonic) return
        const { publicKey, secretKey: privateKey } = createSolanaAccount({
            mnemonic,
            accountNumber: accountNumbers.solana.activeAccountNumber,
        })
        dispatch(
            setSolanaCredential({
                address: publicKey.toString(),
                publicKey: publicKey.toString(),
                privateKey: privateKey.toString(),
            })
        )
    }, [mnemonic, accountNumbers.solana])
}
