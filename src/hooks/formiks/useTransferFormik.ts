import { FormikProps, useFormik } from "formik"
import * as Yup from "yup"
import { useDispatch } from "react-redux"
import { Chain } from "@wormhole-foundation/sdk"
import { useFormiks } from "."
import { defaultSecondaryChain } from "@/config"

export interface TransferFormikValues {
    recipientAddress?: string;
    amount: number;
    chain: Chain
}

export const _useTransferFormik = (): FormikProps<TransferFormikValues> => {

    const dispatch = useDispatch()

    const initialValues: TransferFormikValues = {
        recipientAddress: "",
        amount: 0,
        chain: defaultSecondaryChain
    }

    const validationSchema = Yup.object({
        amount: Yup.number()
            .min(0, "Amount must be higher than 0")
            .required("Amount is required"),
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async ({ recipientAddress, amount, chain }) => {
        },
    })

    return formik
}

export const useTransferFormik = () => {
    const { transferFormik } = useFormiks()
    return transferFormik
}