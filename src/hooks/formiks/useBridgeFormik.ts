import { FormikProps, useFormik } from "formik"
import * as Yup from "yup"
import { TokenId, nativeTokenId } from "@wormhole-foundation/sdk"
import { useFormiks } from "."
import { defaultChain, defaultChainKey, defaultSecondaryChain, defaultSecondaryChainKey } from "@/config"
import { useEffect } from "react"
import { useAppSelector } from "@/redux"

export interface BridgeFormikValues {
    targetChainKey: string;
    amount: number;
    tokenId: TokenId
}

export const _useBridgeFormik = (): FormikProps<BridgeFormikValues> => {
    const preferenceChainKey = useAppSelector((state) => state.chainReducer.preferenceChainKey)
    const initialValues: BridgeFormikValues = {
        amount: 0,
        targetChainKey: defaultSecondaryChainKey,
        tokenId: nativeTokenId(defaultSecondaryChain)
    }

    const validationSchema = Yup.object({
        amount: Yup.number()
            .min(0, "Amount must be higher than 0")
            .required("Amount is required"),
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async ({ amount, targetChainKey }) => {
            console.log(amount, targetChainKey)
        },
    })

    useEffect(() => {
        if (preferenceChainKey === defaultSecondaryChainKey) {
            formik.setFieldValue("targetChainKey", defaultChainKey)
            formik.setFieldValue("tokenId", nativeTokenId(defaultChain))
        } else {
            formik.setFieldValue("targetChainKey", defaultSecondaryChainKey)
            formik.setFieldValue("tokenId", nativeTokenId(defaultSecondaryChain))
        } 
    }, [
        preferenceChainKey
    ])

    return formik
}

export const useBridgeFormik = () => {
    const { bridgeFormik } = useFormiks()
    return bridgeFormik
}