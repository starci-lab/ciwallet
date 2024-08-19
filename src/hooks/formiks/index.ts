import { FormikProps } from "formik"
import { PasswordFormikValues, _usePasswordFormik } from "./usePasswordFormik"
import { use } from "react"
import { HooksContext } from "../provider.hooks"
import { _useCreatePasswordFormik } from "./useCreatePasswordFormik"

export interface UseFormiksReturn {
    passwordFormik: FormikProps<PasswordFormikValues>
    createPasswordFormik: FormikProps<PasswordFormikValues>
}

export const _useFormiks = (): UseFormiksReturn => {
    const passwordFormik = _usePasswordFormik()
    const createPasswordFormik = _useCreatePasswordFormik()

    return {
        passwordFormik,
        createPasswordFormik
    }
}

export const useFormiks = (): UseFormiksReturn => {
    const { formiks } = use(HooksContext)!

    return formiks
}

export * from "./usePasswordFormik"
export * from "./useCreatePasswordFormik"