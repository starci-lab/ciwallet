import { FormikProps, useFormik } from "formik"
import * as Yup from "yup"
import { serialize } from "@wormhole-foundation/sdk"
import { useFormiks } from "."
import {
    defaultChainKey,
    defaultNativeTokenKey,
    defaultSecondaryChainKey,
} from "@/config"
import { useEffect, useState } from "react"
import {
    setBridgeTransferResult,
    triggerSaveStoredVaas,
    useAppDispatch,
    useAppSelector,
} from "@/redux"
import { createAccount, transfer, hasWrappedAsset, createAttestation, submitAttestation } from "@/services"
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

      const chains = useAppSelector((state) => state.chainReducer.chains)
      const tokens = chains[preferenceChainKey].tokens

      const signer = useSigner(preferenceChainKey)

      const [tempTargetChainKey, setTempTargetChainKey] = useState(defaultChainKey)
      const targetSigner = useSigner(tempTargetChainKey)

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
              const { decimals, address: _address } = {
                  ...tokens.find(({ key }) => key === tokenKey),
              }
              if (!_address) return

              const { address: createdAddress } = createAccount({
                  accountNumber: targetAccountNumber,
                  mnemonic,
                  chainKey: targetChainKey,
              })

              const address = targetAddress || createdAddress
              if (!signer) return
              const hasWrapped = await hasWrappedAsset({
                  foreignChainName: chains[targetChainKey].chain,
                  network,
                  sourceChainName: chains[preferenceChainKey].chain,
                  sourceTokenAddress: _address
              })
              console.log(`Has Wrapped: ${hasWrapped}`)
              if (!hasWrapped) {
                  const { txHash, vaa } = await createAttestation({
                      chainName: chains[preferenceChainKey].chain,
                      network,
                      tokenAddress: _address,
                      signer
                  })
                  console.log(`Create Attestation transaction hash: ${txHash}`)
                  console.log(`VAA: ${vaa}`)
                  if (!vaa) return
                  if (!targetSigner) return
                  const _txHash = await submitAttestation({
                      network,
                      signer: targetSigner,
                      targetChainName: chains[targetChainKey].chain,
                      vaa
                  })
                  console.log(`Submit Attestation transaction hash: ${_txHash}`)
              }

              const { txHash, vaa } = await transfer({
                  signer,
                  transferAmount: computeRaw(amount, decimals || 8),
                  sourceChainName:
                  chains[preferenceChainKey].chain,
                  targetChainName: chains[targetChainKey].chain,
                  network,
                  recipientAddress: address,
                  tokenAddress: _address
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
              dispatch(
                  triggerSaveStoredVaas()
              )
          }
      } 
      )

      useEffect(() => {
          setTempTargetChainKey(formik.values.targetChainKey)
      }, [formik.values.targetChainKey])

      useEffect(() => {
          formik.setFieldValue(
              "targetChainKey",
              preferenceChainKey === defaultSecondaryChainKey
                  ? defaultChainKey
                  : defaultSecondaryChainKey
          )
          formik.setFieldValue(
              "tokenKey",
              chains[preferenceChainKey].tokens[0].key
          )
      }, [preferenceChainKey])

      return formik
  }

export const useBridgeTransferFormik = () => {
    const { bridgeTransferFormik } = useFormiks()
    return bridgeTransferFormik
}
