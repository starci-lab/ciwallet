import { FormikProps, useFormik } from "formik"
import * as Yup from "yup"
import { serialize } from "@wormhole-foundation/sdk"
import { useFormiks } from "."
import {
    chainConfig,
    defaultChain,
    defaultChainKey,
    defaultNativeTokenKey,
    defaultSecondaryChainKey,
    defaultSecondaryNativeTokenKey,
} from "@/config"
import { useEffect } from "react"
import {
    setBridgeTransferResult,
    useAppDispatch,
    useAppSelector,
} from "@/redux"
import { createAccount, transfer } from "@/services"
import { useSigner } from "../miscellaneous"
import { computeRaw } from "@/utils"

export interface BridgeTransferFormikValues {
  targetChainKey: string;
  targetAccountNumber: 0;
  targetAddress: "";
  amount: number;
  tokenKey: string;
}

export const _useBridgeTransferFormik =
  (): FormikProps<BridgeTransferFormikValues> => {
      const preferenceChainKey = useAppSelector(
          (state) => state.chainReducer.preferenceChainKey
      )
      const mnemonic = useAppSelector((state) => state.authReducer.mnemonic)
      const aptosAccountNumber = useAppSelector(
          (state) => state.authReducer.accountNumbers.aptos.activeAccountNumber
      )
      const solanaAccountNumber = useAppSelector(
          (state) => state.authReducer.accountNumbers.solana.activeAccountNumber
      )

      const signer = useSigner(preferenceChainKey)

      useEffect(() => {
          let defaultTargetAccountNumber = 0
          switch (formik.values.targetChainKey) {
          case "aptos": {
              defaultTargetAccountNumber = aptosAccountNumber
              break
          }
          case "solana": {
              defaultTargetAccountNumber = solanaAccountNumber
              break
          }
          default:
              break
          }
          formik.setFieldValue("targetAccountNumber", defaultTargetAccountNumber)
      }, [aptosAccountNumber, solanaAccountNumber])

      const initialValues: BridgeTransferFormikValues = {
          amount: 0,
          targetAccountNumber: 0,
          targetAddress: "",
          targetChainKey: defaultSecondaryChainKey,
          tokenKey: defaultNativeTokenKey,
      }

      const validationSchema = Yup.object({
          amount: Yup.number()
              .min(0, "Amount must be higher than 0")
              .required("Amount is required"),
      })

      const network = useAppSelector((state) => state.chainReducer.network)

      const dispatch = useAppDispatch()

      const tokens = useAppSelector((state) => state.tokenReducer.tokens)
      const { tokens: _tokens } = { ...tokens[preferenceChainKey] }

      const formik = useFormik({
          initialValues,
          validationSchema,
          onSubmit: async ({
              targetAccountNumber,
              targetAddress,
              targetChainKey,
              amount,
              tokenKey,
          }) => {
              const { decimals, tokenId } = {
                  ..._tokens.find(({ key }) => key === tokenKey),
              }
              if (!tokenId) return

              const { address: createdAddress } = createAccount({
                  accountNumber: targetAccountNumber,
                  mnemonic,
                  chainKey: targetChainKey,
              })

              const address = targetAddress || createdAddress
              if (!signer) return
              const { txHash, vaa } = await transfer({
                  signer,
                  transferAmount: computeRaw(amount, decimals || 8),
                  sourceChainName:
            chainConfig().chains.find(({ key }) => key === preferenceChainKey)
                ?.chain ?? defaultChain,
                  targetChainName:
            chainConfig().chains.find(({ key }) => key === targetChainKey)
                ?.chain ?? defaultChain,
                  network,
                  recipientAddress: address,
                  tokenAddress: tokenId.address,
              })
              if (vaa === null) return
              const serializedVaa = Buffer.from(serialize(vaa)).toString("base64")
              dispatch(
                  setBridgeTransferResult({
                      vaa: {
                          serializedVaa,
                          amount: Number(amount),
                          targetChainKey,
                          fromChainKey: preferenceChainKey,
                          targetAddress: address,
                          fromAddress: signer.address(),
                          tokenKey,
                      },
                      txHash,
                  })
              )
          },
      })

      useEffect(() => {
          formik.setFieldValue(
              "targetChainKey",
              preferenceChainKey === defaultSecondaryChainKey
                  ? defaultChainKey
                  : defaultSecondaryChainKey
          )
          formik.setFieldValue(
              "tokenKey",
              preferenceChainKey === defaultChainKey
                  ? defaultNativeTokenKey
                  : defaultSecondaryNativeTokenKey
          )
      }, [preferenceChainKey])

      return formik
  }

export const useBridgeTransferFormik = () => {
    const { bridgeTransferFormik } = useFormiks()
    return bridgeTransferFormik
}
