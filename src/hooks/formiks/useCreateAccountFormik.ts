import { FormikProps, useFormik } from "formik"
import * as Yup from "yup"
import { useFormiks } from "."
import { createAccount, useAppDispatch, useAppSelector } from "@/redux"

export interface CreateAccountFormikValues {
  accountNumber: string;
}

export const _useCreateAccountFormik =
  (): FormikProps<CreateAccountFormikValues> => {
      const preferenceChainKey = useAppSelector(
          (state) => state.chainReducer.preferenceChainKey
      )
      const accountNumbers = useAppSelector(
          (state) => state.authReducer.accountNumbers
      )
      const dispatch = useAppDispatch()

      const initialValues: CreateAccountFormikValues = {
          accountNumber: "",
      }

      const validationSchema = Yup.object({
      //
      })

      const formik = useFormik({
          initialValues,
          validationSchema,
          onSubmit: ({ accountNumber }) => {
              let _accountNumber: number
              if (!accountNumber) {
                  let maxAccountNumber = 0
                  switch (preferenceChainKey) {
                  case "aptos": {
                      maxAccountNumber = Math.max(
                          ...Object.keys(accountNumbers.aptos.accounts).map((key) =>
                              Number.parseInt(key)
                          )
                      )
                      break
                  }
                  case "solana": {
                      maxAccountNumber = Math.max(
                          ...Object.keys(accountNumbers.solana.accounts).map(
                              (key) => Number.parseInt(key)
                          )
                      )
                      break
                  }
                  default:
                      break
                  }

                  _accountNumber = maxAccountNumber + 1
              } else {
                  _accountNumber = Number.parseInt(accountNumber)
              }
              dispatch(
                  createAccount({
                      chainKey: preferenceChainKey,
                      accountNumber: _accountNumber,
                      account: {
                          imageUrl: "",
                          name: `Account ${_accountNumber}`,
                      },
                  })
              )
          },
      })

      return formik
  }

export const useCreateAccountFormik = () => {
    const { createAccountFormik } = useFormiks()
    return createAccountFormik
}
