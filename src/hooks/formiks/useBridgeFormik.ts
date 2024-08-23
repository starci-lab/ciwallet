import { FormikProps, useFormik } from "formik"
import * as Yup from "yup"
import { TokenId, nativeTokenId } from "@wormhole-foundation/sdk"
import { useFormiks } from "."
import {
    chainConfig,
    defaultChainKey,
    defaultSecondaryChain,
    defaultSecondaryChainKey,
} from "@/config"
import { useEffect } from "react"
import { useAppSelector } from "@/redux"
import { createAptosAccount, createSolanaAccount } from "@/services"

export interface BridgeFormikValues {
  targetChainKey: string;
  targetAccountNumber: 0;
  targetAddress: "";
  amount: number;
  tokenId: TokenId;
}

export const _useBridgeFormik = (): FormikProps<BridgeFormikValues> => {
    const preferenceChainKey = useAppSelector(
        (state) => state.chainReducer.preferenceChainKey
    )
    const mnemonic = useAppSelector((state) => state.authReducer.mnemonic)
    const aptosAccountNumber = useAppSelector(
        (state) => state.authReducer.accountNumbers.aptos.activeAccountNumber
    )
    const solanaAccountNumber = useAppSelector(
        (state) => state.authReducer.accountNumbers.solana.activeAccountNumber
    )

    useEffect(() => {
        let defaultTargetAccountNumber = 0
        switch (formik.values.targetChainKey) {
        case "aptos": {
            defaultTargetAccountNumber = aptosAccountNumber
            break
        }
        case "solana": {
            defaultTargetAccountNumber = solanaAccountNumber
            break
        }
        default:
            break
        }
        formik.setFieldValue("targetAccountNumber", defaultTargetAccountNumber)
    }, [aptosAccountNumber, solanaAccountNumber])

    const initialValues: BridgeFormikValues = {
        amount: 0,
        targetAccountNumber: 0,
        targetAddress: "",
        targetChainKey: defaultSecondaryChainKey,
        tokenId: nativeTokenId(defaultSecondaryChain),
    }

    const validationSchema = Yup.object({
        amount: Yup.number()
            .min(0, "Amount must be higher than 0")
            .required("Amount is required"),
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async ({
            targetAccountNumber,
            targetAddress,
            targetChainKey,
        }) => {
            const { accountAddress } = createAptosAccount({
                accountNumber: targetAccountNumber,
                mnemonic,
            })

            const { publicKey } = createSolanaAccount({
                accountNumber: targetAccountNumber,
                mnemonic,
            })

            const map: Record<string, string> = {
                aptos: accountAddress.toString(),
                solana: publicKey.toString() ?? "",
            }

            const address = targetAddress ?? map[targetChainKey]
            console.log(address)
        },
    })

    useEffect(() => {
        if (preferenceChainKey === defaultSecondaryChainKey) {
            formik.setFieldValue("targetChainKey", defaultChainKey)
        } else {
            formik.setFieldValue("targetChainKey", defaultSecondaryChainKey)
        }
    }, [preferenceChainKey])

    useEffect(() => {
        formik.setFieldValue("tokenId", {
            address: "native",
            chain:
        chainConfig().chains.find(({ key }) => key === preferenceChainKey)
            ?.chain ?? "",
        })
    }, [preferenceChainKey])

    return formik
}

export const useBridgeFormik = () => {
    const { bridgeFormik } = useFormiks()
    return bridgeFormik
}
