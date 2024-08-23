import { FormikProps } from "formik"
import { PasswordFormikValues, _usePasswordFormik } from "./usePasswordFormik"
import { use } from "react"
import { HooksContext } from "../provider.hooks"
import { _useCreatePasswordFormik } from "./useCreatePasswordFormik"
import { TransferFormikValues, _useTransferFormik } from "./useTransferFormik"
import { BridgeFormikValues, _useBridgeFormik } from "./useBridgeFormik"
import { CreateAccountFormikValues, _useCreateAccountFormik } from "./useCreateAccountFormik"

export interface UseFormiksReturn {
    passwordFormik: FormikProps<PasswordFormikValues>
    createPasswordFormik: FormikProps<PasswordFormikValues>,
    transferFormik: FormikProps<TransferFormikValues>,
    bridgeFormik: FormikProps<BridgeFormikValues>,
    createAccountFormik: FormikProps<CreateAccountFormikValues>
}

export const _useFormiks = (): UseFormiksReturn => {
    const passwordFormik = _usePasswordFormik()
    const createPasswordFormik = _useCreatePasswordFormik()
    const transferFormik = _useTransferFormik()
    const bridgeFormik = _useBridgeFormik()
    const createAccountFormik = _useCreateAccountFormik()

    return {
        passwordFormik,
        createPasswordFormik,
        transferFormik,
        bridgeFormik,
        createAccountFormik
    }
}

export const useFormiks = (): UseFormiksReturn => {
    const { formiks } = use(HooksContext)!

    return formiks
}

export * from "./usePasswordFormik"
export * from "./useCreatePasswordFormik"
export * from "./useTransferFormik"
export * from "./useBridgeFormik"
export * from "./useCreateAccountFormik"