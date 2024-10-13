import { FormikProps, useFormik } from "formik"
import * as Yup from "yup"
import { useFormiks } from "."
import {
    setBridgeRedeemResult,
    useAppDispatch,
    useAppSelector,
    useVaa,
} from "@/redux"
import { parseNetwork, redeem } from "@/services"
import { useBalance, useGenericSigner } from "../miscellaneous"
import { deserialize, VAA } from "@wormhole-foundation/sdk"
import { valuesWithKey } from "@/utils"
import { crosschainConfig, defaultChainKey, defaultSecondaryChainKey, nativeTokenKey } from "@/config"

export interface BridgeRedeemFormikValues {
  nativeAmountPlusFee: number;
}

export const _useBridgeRedeemFormik =
  (): FormikProps<BridgeRedeemFormikValues> => {
      const selectedKey = useAppSelector(state => state.vaaReducer.selectedKey)
      const storedVaas = useAppSelector(state => state.vaaReducer.storedVaas)
      const vaa = storedVaas[selectedKey]
    
      let deserializedVaa : VAA<"TokenBridge:Transfer"> | undefined
      if (vaa) {
          deserializedVaa = deserialize(
              "TokenBridge:Transfer",
              Uint8Array.from(Buffer.from(vaa.serializedVaa, "base64"))
          )
      }
      const chains = useAppSelector((state) => state.blockchainReducer.chains)

      const targetChain = valuesWithKey(chains).find(({chain}) => chain === deserializedVaa?.payload.to.chain) 
   
      const preferenceChainKey = useAppSelector(
          (state) => state.blockchainReducer.preferenceChainKey
      )
      const minimalFee = Object.values(crosschainConfig()[targetChain?.key ?? defaultSecondaryChainKey][defaultChainKey])[0].minimalFee
      const initialValues: BridgeRedeemFormikValues = {
          nativeAmountPlusFee: minimalFee,
      }

      const dispatch = useAppDispatch()

      const address = useAppSelector(
          (state) => state.authReducer.credentials[preferenceChainKey].address
      )
      const { balanceSwr: nativeTokenBalanceSwr } = useBalance({
          tokenKey: nativeTokenKey,
          accountAddress: address,
          chainKey: targetChain?.key ?? defaultSecondaryChainKey,
      })
      
      const validationSchema = Yup.object({
          nativeAmountPlusFee: nativeTokenBalanceSwr.data !== undefined
              ? Yup.number().max(
                  nativeTokenBalanceSwr.data,
                  `Your native balance is insufficient (Required: ${minimalFee} SYMBOL)`
              )
              : Yup.number(),
      })

      const network = useAppSelector((state) => state.blockchainReducer.network)

      const signer = useGenericSigner(targetChain?.key, deserializedVaa?.payload.to.address.toString())

      const formik = useFormik({
          initialValues,
          validationSchema,
          onSubmit: async () => {
              if (!vaa) return
              if (!signer) return
              if (!deserializedVaa) return
              
              const txHash = await redeem({
                  signer,
                  vaa: deserialize(
                      "TokenBridge:Transfer",
                      Uint8Array.from(Buffer.from(vaa.serializedVaa, "base64"))
                  ),
                  senderChainName: deserializedVaa.emitterChain,
                  redeemChainName: deserializedVaa.payload.to.chain,
                  network: parseNetwork(network),
              })

              dispatch(setBridgeRedeemResult({ txHash, vaa }))
              dispatch(useVaa(vaa.serializedVaa))
          },
      })

      return formik
  }

export const useBridgeRedeemFormik = () => {
    const { bridgeRedeemFormik } = useFormiks()
    return bridgeRedeemFormik
}
