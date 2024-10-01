import { FormikProps } from "formik"
import { PasswordFormikValues, _usePasswordFormik } from "./usePasswordFormik"
import { use } from "react"
import { HooksContext } from "../provider.hooks"
import { _useCreatePasswordFormik } from "./useCreatePasswordFormik"
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
import {
    MnemonicInputFormikValues,
    _useMnemonicInputFormik,
} from "./useMnemonicInputFormik"
import {
    _useBridgeWrapFormik,
    BridgeWrapFormikValues,
} from "./useBridgeWrapFormik"

export interface UseFormiksReturn {
  passwordFormik: FormikProps<PasswordFormikValues>;
  createPasswordFormik: FormikProps<PasswordFormikValues>;
  bridgeTransferFormik: FormikProps<BridgeTransferFormikValues>;
  bridgeRedeemFormik: FormikProps<BridgeRedeemFormikValues>;
  createAccountFormik: FormikProps<CreateAccountFormikValues>;
  mnemonicInputFormik: FormikProps<MnemonicInputFormikValues>;
  bridgeWrapFormik: FormikProps<BridgeWrapFormikValues>;
}

export const _useFormiks = (): UseFormiksReturn => {
    const passwordFormik = _usePasswordFormik()
    const createPasswordFormik = _useCreatePasswordFormik()
    const bridgeTransferFormik = _useBridgeTransferFormik()
    const bridgeRedeemFormik = _useBridgeRedeemFormik()
    const createAccountFormik = _useCreateAccountFormik()
    const mnemonicInputFormik = _useMnemonicInputFormik()
    const bridgeWrapFormik = _useBridgeWrapFormik()

    return {
        passwordFormik,
        createPasswordFormik,
        bridgeTransferFormik,
        bridgeRedeemFormik,
        createAccountFormik,
        mnemonicInputFormik,
        bridgeWrapFormik,
    }
}

export const useFormiks = (): UseFormiksReturn => {
    const { formiks } = use(HooksContext)!

    return formiks
}

export * from "./usePasswordFormik"
export * from "./useCreatePasswordFormik"
export * from "./useBridgeTransferFormik"
export * from "./useBridgeRedeemFormik"
export * from "./useCreateAccountFormik"
export * from "./useBridgeWrapFormik"
