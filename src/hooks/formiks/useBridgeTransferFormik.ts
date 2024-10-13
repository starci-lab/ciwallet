import { FormikProps, useFormik } from "formik"
import * as Yup from "yup"
import { serialize } from "@wormhole-foundation/sdk"
import { useFormiks } from "."
import {
    defaultChainKey,
    nativeTokenKey,
    defaultSecondaryChainKey,
    SupportedBridgeProtocolKey,
    crosschainConfig,
} from "@/config"
import { useEffect } from "react"
import {
    addStoredVaa,
    setBridgeTransferResult,
    triggerSaveStoredVaas,
    useAppDispatch,
    useAppSelector,
} from "@/redux"
import { createAccount, transfer, parseNetwork } from "@/services"
import { useBalance, useSigner } from "../miscellaneous"
import { computeRaw } from "@/utils"

export interface BridgeTransferFormikValues {
  targetChainKey: string;
  targetAccountNumber: 0;
  targetAddress: "";
  amount: number;
  tokenKey: string;
  balance: number;
  bridgeProtocolKey: string;
  nativeAmountPlusFee: number;
}

export const _useBridgeTransferFormik =
  (): FormikProps<BridgeTransferFormikValues> => {
      const preferenceChainKey = useAppSelector(
          (state) => state.blockchainReducer.preferenceChainKey
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

      const _defaultSecondaryChainKey = preferenceChainKey === defaultChainKey ? defaultSecondaryChainKey : defaultChainKey
      const minimalFee = Object.values(crosschainConfig()[preferenceChainKey][_defaultSecondaryChainKey])[0].minimalFee

      const initialValues: BridgeTransferFormikValues = {
          amount: 0,
          targetAccountNumber: 0,
          targetAddress: "",
          targetChainKey: _defaultSecondaryChainKey,
          tokenKey: nativeTokenKey,
          balance: 0,
          bridgeProtocolKey: SupportedBridgeProtocolKey.Wormhole,
          nativeAmountPlusFee: minimalFee,
      }

      const address = useAppSelector(
          (state) => state.authReducer.credentials[preferenceChainKey].address
      )
      const { balanceSwr: nativeTokenBalanceSwr } = useBalance({
          tokenKey: nativeTokenKey,
          accountAddress: address,
          chainKey: preferenceChainKey,
      })
      
      console.log(nativeTokenBalanceSwr.data)
      const validationSchema = Yup.object({
          amount: Yup.number()
              .min(0, "Amount must be higher than 0")
              .max(Yup.ref("balance"), "Insufficient balance.")
              .required("Amount is required"),
          nativeAmountPlusFee: nativeTokenBalanceSwr.data !== undefined
              ? Yup.number().max(
                  nativeTokenBalanceSwr.data,
                  ({ value }) => 
                      (Number(value) <= minimalFee) ?`Your native balance plus fee is insufficient (Required: ${minimalFee} SYMBOL)` : `Your native balance plus fee is insufficient (Required: AMOUNT + ${minimalFee} SYMBOL)`
              )
              : Yup.number(),
      })

      const network = useAppSelector((state) => state.blockchainReducer.network)

      const dispatch = useAppDispatch()

      const chains = useAppSelector((state) => state.blockchainReducer.chains)
      const tokens = chains[preferenceChainKey].tokens

      const signer = useSigner(preferenceChainKey)

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
              const { decimals, addresses } = tokens[tokenKey]
              const _address = addresses[network]
              if (!_address) return

              const { address: createdAddress } = createAccount({
                  accountNumber: targetAccountNumber,
                  mnemonic,
                  chainKey: targetChainKey,
              })

              const recipientAddress = targetAddress || createdAddress
              if (!signer) return

              const { txHash, vaa } = await transfer({
                  signer,
                  transferAmount: computeRaw(amount, decimals || 8),
                  sourceChainName: chains[preferenceChainKey].chain,
                  targetChainName: chains[targetChainKey].chain,
                  network: parseNetwork(network),
                  recipientAddress: recipientAddress,
                  tokenAddress: _address,
              })
              if (vaa === null) return
              const serializedVaa = Buffer.from(serialize(vaa)).toString("base64")
              dispatch(
                  setBridgeTransferResult({
                      vaa: {
                          network,
                          senderAddress: address,
                          serializedVaa,
                          txHash,
                          bridgeProtocolKey: SupportedBridgeProtocolKey.Wormhole,
                          tokenInfo: tokens[tokenKey],
                          decimals: tokens[tokenKey].decimals,
                      },
                      txHash,
                  })
              )
              dispatch(addStoredVaa({
                  network,
                  senderAddress: address,
                  serializedVaa,
                  txHash,
                  tokenInfo: tokens[tokenKey],
                  bridgeProtocolKey: SupportedBridgeProtocolKey.Wormhole,
                  decimals: tokens[tokenKey].decimals,
              }))
              dispatch(triggerSaveStoredVaas())
          },
      })

      useEffect(() => {
          formik.setFieldValue(
              "targetChainKey",
              preferenceChainKey === defaultSecondaryChainKey
                  ? defaultChainKey
                  : defaultSecondaryChainKey
          )
          formik.setFieldValue("tokenKey", nativeTokenKey)
      }, [preferenceChainKey])

      return formik
  }

export const useBridgeTransferFormik = () => {
    const { bridgeTransferFormik } = useFormiks()
    return bridgeTransferFormik
}
