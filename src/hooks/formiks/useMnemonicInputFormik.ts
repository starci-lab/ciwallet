import { FormikProps, useFormik } from "formik"
import * as Yup from "yup"
import { useFormiks } from "."
import { useRouter } from "next/navigation"
import { constantConfig } from "@/config"
import { setMnemonic, useAppDispatch } from "@/redux"
import { validateMnemonic } from "@/services"

export interface MnemonicInputFormikValues {
    mnemonic: string;
}

export const _useMnemonicInputFormik = (): FormikProps<MnemonicInputFormikValues> => {

    const router = useRouter()

    const dispatch = useAppDispatch()

    const initialValues: MnemonicInputFormikValues = {
        mnemonic: "",
    }

    const validationSchema = Yup.object({
        mnemonic: Yup.string()
            .test("validate-mnemonic", "Invalid mnemonic", (mnemonic) => {
                if (!mnemonic) return false
                return validateMnemonic(mnemonic)
            })
            .required("Mnemonic is required"),
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: ({ mnemonic }) => {
            dispatch(setMnemonic(mnemonic))
            router.push(constantConfig().path.home)
        },
    })

    return formik
}

export const useMnemonicInputFormik = () => {
    const { mnemonicInputFormik } = useFormiks()
    return mnemonicInputFormik
}