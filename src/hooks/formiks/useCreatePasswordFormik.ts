import { FormikProps, useFormik } from "formik"
import * as Yup from "yup"
import { useFormiks } from "."
import { useRouter } from "next/navigation"
import { constantConfig } from "@/config"
import { setPassword, useAppDispatch, useAppSelector } from "@/redux"
import { BaseAccounts, createAccount, saveEncryptedBaseAccounts, saveEncryptedMnemonic } from "@/services"

export interface CreatePasswordFormikValues {
    password: string;
}

export const _useCreatePasswordFormik = (): FormikProps<CreatePasswordFormikValues> => {

    const router = useRouter()

    const mnemonic = useAppSelector((state) => state.authReducer.mnemonic)
    const dispatch = useAppDispatch()

    const initialValues: CreatePasswordFormikValues = {
        password: "",
    }

    const validationSchema = Yup.object({
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
    })

    const chains = useAppSelector((state) => state.blockchainReducer.chains)
    const chainKeys = Object.keys(chains)

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: ({ password }) => {
            saveEncryptedMnemonic({
                mnemonic,
                password
            })
            const baseAccounts : BaseAccounts = {}
            //create session here
            for (const chainKey of chainKeys) {
                //create account
                const { address, privateKey, publicKey} = createAccount({
                    mnemonic,
                    accountNumber: 0,
                    chainKey
                })

                baseAccounts[chainKey] = {
                    accounts: {
                        [privateKey]: {
                            name: "User",
                            imageUrl: "",
                            accountAddress: address,
                            publicKey: publicKey,
                            accountNumber: 0,
                        }
                    },
                    activePrivateKey: privateKey,
                }
            }
            saveEncryptedBaseAccounts({
                baseAccounts,
                password
            })
            dispatch(setPassword(password))
            router.push(constantConfig().path.home)
        },
    })

    return formik
}

export const useCreatePasswordFormik = () => {
    const { createPasswordFormik } = useFormiks()
    return createPasswordFormik
}