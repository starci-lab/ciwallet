import { setAptosCredential, setSolanaCredential, useAppDispatch, useAppSelector } from "@/redux"
import { getSeed } from "@/services"
import { Account } from "@aptos-labs/ts-sdk"
import { Keypair } from "@solana/web3.js"
import { useEffect } from "react"

export const useAddresses = () => {
    const state = useAppSelector((state) => state)
    console.log(state.credentialReducer)

    const { mnemonic, accountNumber } = useAppSelector(
        (state) => state.authReducer
    )

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!mnemonic) return

        const { publicKey, privateKey, accountAddress } =
      Account.fromDerivationPath({
          mnemonic,
          path: `m/44'/637'/0'/0'/${accountNumber}'`,
      })

        dispatch(
            setAptosCredential({
                address: accountAddress.toString(),
                publicKey: publicKey.toString(),
                privateKey: privateKey.toString(),
            })
        )
    }, [mnemonic, accountNumber])

    useEffect(() => {
        if (!mnemonic) return
        const handleEffect = async () => {
            const seed = await getSeed({
                mnemonic,
                accountNumber,
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
    }, [mnemonic, accountNumber])
}
