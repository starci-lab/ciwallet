import { FormikProps, useFormik } from "formik"
import * as Yup from "yup"
import { useFormiks } from "."
import { useRouter } from "next/navigation"
import { constantConfig } from "@/config"
import { useAppSelector } from "@/redux"
import { saveEncryptedMnemonic } from "@/services"

export interface CreatePasswordFormikValues {
    password: string;
}

export const _useCreatePasswordFormik = (): FormikProps<CreatePasswordFormikValues> => {

    const router = useRouter()

    const mnemonic = useAppSelector((state) => state.authReducer.mnemonic)

    const initialValues: CreatePasswordFormikValues = {
        password: "",
    }

    const validationSchema = Yup.object({
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: ({ password }) => {
            saveEncryptedMnemonic({
                mnemonic,
                password
            })
            router.push(constantConfig().path.home)
        },
    })

    return formik
}

export const useCreatePasswordFormik = () => {
    const { createPasswordFormik } = useFormiks()
    return createPasswordFormik
}