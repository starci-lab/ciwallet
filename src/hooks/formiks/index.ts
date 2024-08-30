import { FormikProps } from "formik"
import { PasswordFormikValues, _usePasswordFormik } from "./usePasswordFormik"
import { use } from "react"
import { HooksContext } from "../provider.hooks"
import { _useCreatePasswordFormik } from "./useCreatePasswordFormik"
import { TransferFormikValues, _useTransferFormik } from "./useTransferFormik"
import {
    BridgeTransferFormikValues,
    _useBridgeTransferFormik,
} from "./useBridgeTransferFormik"
import {
    CreateAccountFormikValues,
    _useCreateAccountFormik,
} from "./useCreateAccountFormik"
import {
    BridgeRedeemFormikValues,
    _useBridgeRedeemFormik,
} from "./useBridgeRedeemFormik"
import { MnemonicInputFormikValues, _useMnemonicInputFormik } from "./useMnemonicInputFormik"

export interface UseFormiksReturn {
  passwordFormik: FormikProps<PasswordFormikValues>;
  createPasswordFormik: FormikProps<PasswordFormikValues>;
  transferFormik: FormikProps<TransferFormikValues>;
  bridgeTransferFormik: FormikProps<BridgeTransferFormikValues>;
  bridgeRedeemFormik: FormikProps<BridgeRedeemFormikValues>;
  createAccountFormik: FormikProps<CreateAccountFormikValues>;
  mnemonicInputFormik: FormikProps<MnemonicInputFormikValues>;
}

export const _useFormiks = (): UseFormiksReturn => {
    const passwordFormik = _usePasswordFormik()
    const createPasswordFormik = _useCreatePasswordFormik()
    const transferFormik = _useTransferFormik()
    const bridgeTransferFormik = _useBridgeTransferFormik()
    const bridgeRedeemFormik = _useBridgeRedeemFormik()
    const createAccountFormik = _useCreateAccountFormik()
    const mnemonicInputFormik = _useMnemonicInputFormik()

    return {
        passwordFormik,
        createPasswordFormik,
        transferFormik,
        bridgeTransferFormik,
        bridgeRedeemFormik,
        createAccountFormik,
        mnemonicInputFormik
    }
}

export const useFormiks = (): UseFormiksReturn => {
    const { formiks } = use(HooksContext)!

    return formiks
}

export * from "./usePasswordFormik"
export * from "./useCreatePasswordFormik"
export * from "./useTransferFormik"
export * from "./useBridgeTransferFormik"
export * from "./useBridgeRedeemFormik"
export * from "./useCreateAccountFormik"
