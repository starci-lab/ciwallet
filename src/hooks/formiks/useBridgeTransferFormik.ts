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
    StoredVaa,
    triggerSaveStoredVaas,
    useAppDispatch,
    useAppSelector,
} from "@/redux"
import { transfer, parseNetwork } from "@/services"
import { useBalance, useSigner } from "../miscellaneous"
import { computeRaw, valuesWithKey } from "@/utils"

export interface BridgeTransferFormikValues {
  targetChainKey: string;
  targetPrivateKey: string;
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
      const baseAccounts = useAppSelector((state) => state.authReducer.baseAccounts)

      const defaultPrivateKey = baseAccounts[defaultChainKey]?.activePrivateKey
      const defaultSecondaryPrivateKey = baseAccounts[defaultSecondaryChainKey]?.activePrivateKey

      const _defaultTargetPrivateKey = preferenceChainKey === defaultChainKey ? defaultSecondaryPrivateKey : defaultPrivateKey
      const _defaultSecondaryChainKey = preferenceChainKey === defaultChainKey ? defaultSecondaryChainKey : defaultChainKey
      const _defaultBridgeProtocolKey = valuesWithKey(crosschainConfig()[preferenceChainKey][_defaultSecondaryChainKey])[0].key 
      const minimalFee = Object.values(crosschainConfig()[preferenceChainKey][_defaultSecondaryChainKey])[0].minimalFee

      const initialValues: BridgeTransferFormikValues = {
          amount: 0,
          targetPrivateKey: _defaultTargetPrivateKey,
          targetAddress: "",
          targetChainKey: _defaultSecondaryChainKey,
          tokenKey: nativeTokenKey,
          balance: 0,
          bridgeProtocolKey: _defaultBridgeProtocolKey,
          nativeAmountPlusFee: minimalFee,
      }

      const activePrivateKey = baseAccounts[preferenceChainKey]?.activePrivateKey
      const accountAddress = baseAccounts[preferenceChainKey]?.accounts[activePrivateKey]?.accountAddress

      const { balanceSwr: nativeTokenBalanceSwr } = useBalance({
          tokenKey: nativeTokenKey,
          accountAddress,
          chainKey: preferenceChainKey,
      })
      
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
              targetPrivateKey,
              targetAddress,
              targetChainKey,
              amount,
              tokenKey,
          }) => {
              const { decimals, addresses } = tokens[tokenKey]
              const _address = addresses[network]
              if (!_address) return

              const recipientAddress = targetAddress || baseAccounts[targetChainKey].accounts[targetPrivateKey].accountAddress
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
              const _vaa : StoredVaa = {
                  network,
                  senderAddress: accountAddress,
                  serializedVaa,
                  txHash,
                  bridgeProtocolKey: SupportedBridgeProtocolKey.Wormhole,
                  tokenInfo: tokens[tokenKey],
                  decimals: tokens[tokenKey].decimals,
              }
              dispatch(
                  setBridgeTransferResult({
                      vaa: _vaa,
                      txHash,
                  })
              )
              dispatch(addStoredVaa(_vaa))
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
