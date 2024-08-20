import { FormikProps } from "formik"
import { PasswordFormikValues, _usePasswordFormik } from "./usePasswordFormik"
import { use } from "react"
import { HooksContext } from "../provider.hooks"
import { _useCreatePasswordFormik } from "./useCreatePasswordFormik"
import { TransferFormikValues, _useTransferFormik } from "./useTransferFormik"
import { BridgeFormikValues, _useBridgeFormik } from "./useBridgeFormik"

export interface UseFormiksReturn {
    passwordFormik: FormikProps<PasswordFormikValues>
    createPasswordFormik: FormikProps<PasswordFormikValues>,
    transferFormik: FormikProps<TransferFormikValues>,
    bridgeFormik: FormikProps<BridgeFormikValues>
}

export const _useFormiks = (): UseFormiksReturn => {
    const passwordFormik = _usePasswordFormik()
    const createPasswordFormik = _useCreatePasswordFormik()
    const transferFormik = _useTransferFormik()
    const bridgeFormik = _useBridgeFormik()

    return {
        passwordFormik,
        createPasswordFormik,
        transferFormik,
        bridgeFormik
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