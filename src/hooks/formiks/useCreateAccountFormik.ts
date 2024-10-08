import { FormikProps, useFormik } from "formik"
import * as Yup from "yup"
import { useFormiks } from "."
import { createAccount, triggerSaveAccountNumbers, useAppDispatch, useAppSelector } from "@/redux"

export interface CreateAccountFormikValues {
  accountNumber: string;
}

export const _useCreateAccountFormik =
  (): FormikProps<CreateAccountFormikValues> => {
      const preferenceChainKey = useAppSelector(
          (state) => state.blockchainReducer.preferenceChainKey
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
              //algorand
              if (preferenceChainKey === "algorand") {                  
                  let _accountNumber: number
                  if (!accountNumber) {
      
                      const maxAccountNumber = Math.max(
                          ...Object.keys(accountNumbers[preferenceChainKey].accounts).map((key) =>
                              Number.parseInt(key)
                          )
                      )

                      _accountNumber = maxAccountNumber + 1
                  } else {
                      _accountNumber = Number.parseInt(accountNumber)
                  }
                  
                  dispatch(createAccount({
                      accountNumber: _accountNumber,
                      account: {
                          imageUrl: "",
                          name: `Account ${_accountNumber}`,
                      },
                      chainKey: preferenceChainKey,
                  }))
                  dispatch(triggerSaveAccountNumbers())
                  return
              }
              let _accountNumber: number
              if (!accountNumber) {
    
                  const maxAccountNumber = Math.max(
                      ...Object.keys(accountNumbers[preferenceChainKey].accounts).map((key) =>
                          Number.parseInt(key)
                      )
                  )

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
              dispatch(triggerSaveAccountNumbers())
          }
      })

      return formik
  }

export const useCreateAccountFormik = () => {
    const { createAccountFormik } = useFormiks()
    return createAccountFormik
}
