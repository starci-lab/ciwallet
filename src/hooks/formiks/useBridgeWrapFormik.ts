import { FormikProps, useFormik } from "formik"
import * as Yup from "yup"
import { useFormiks } from "."
import {
    useAppSelector,
} from "@/redux"
export interface BridgeWrapFormikValues {
  tokenKey: string;
}

export const _useBridgeWrapFormik =
  (): FormikProps<BridgeWrapFormikValues> => {
      const preferenceChainKey = useAppSelector(
          (state) => state.blockchainReducer.preferenceChainKey
      )
       
      const initialValues: BridgeWrapFormikValues = {
          tokenKey: "native"
      }
      const validationSchema = Yup.object({
          //
      })

      const formik = useFormik({
          initialValues,
          validationSchema,
          onSubmit: async ({
              tokenKey,
          }) => {
              console.log("tokenKey", tokenKey)
              console.log(preferenceChainKey)
          }
      } 
      )

      return formik
  }

export const useBridgeWrapFormik = () => {
    const { bridgeWrapFormik } = useFormiks()
    return bridgeWrapFormik
}
