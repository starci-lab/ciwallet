import { setAptosCredential, setSolanaCredential, useAppDispatch, useAppSelector } from "@/redux"
import { getSeed } from "@/services"
import { Account } from "@aptos-labs/ts-sdk"
import { Keypair } from "@solana/web3.js"
import { useEffect } from "react"

export const useCredentials = () => {
    const { mnemonic, accountNumbers } = useAppSelector(
        (state) => state.authReducer
    )
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!mnemonic) return

        const { publicKey, privateKey, accountAddress } =
      Account.fromDerivationPath({
          mnemonic,
          path: `m/44'/637'/0'/0'/${accountNumbers.aptos}'`,
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
        const handleEffect = async () => {
            const seed = await getSeed({
                mnemonic,
                accountNumber: accountNumbers.solana,
            })
            const { publicKey, secretKey: privateKey } = Keypair.fromSeed(
                seed.subarray(0, 32)
            )
            dispatch(
                setSolanaCredential({
                    address: publicKey.toString(),
                    publicKey: publicKey.toString(),
                    privateKey: privateKey.toString(),
                })
            )
        }
        handleEffect()
    }, [mnemonic, accountNumbers.solana])
}
