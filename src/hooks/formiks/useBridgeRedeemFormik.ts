import { FormikProps, useFormik } from "formik"
import * as Yup from "yup"
import { useFormiks } from "."
import {
    setBridgeRedeemResult,
    useAppDispatch,
    useAppSelector,
    useVaa,
} from "@/redux"
import {
    parseNetwork,
    redeem,
    toWormholeNativeFromUniversal,
} from "@/services"
import { useBalance, useGenericSigner } from "../miscellaneous"
import { deserialize, VAA } from "@wormhole-foundation/sdk"
import { valuesWithKey } from "@/utils"
import {
    crosschainConfig,
    defaultChainKey,
    defaultSecondaryChain,
    defaultSecondaryChainKey,
    nativeTokenKey,
} from "@/config"

export interface BridgeRedeemFormikValues {
  nativeAmountPlusFee: number;
}

export const _useBridgeRedeemFormik =
  (): FormikProps<BridgeRedeemFormikValues> => {
      const selectedKey = useAppSelector((state) => state.vaaReducer.selectedKey)
      const storedVaas = useAppSelector((state) => state.vaaReducer.storedVaas)
      const vaa = storedVaas[selectedKey]

      let deserializedVaa: VAA<"TokenBridge:Transfer"> | undefined
      if (vaa) {
          deserializedVaa = deserialize(
              "TokenBridge:Transfer",
              Uint8Array.from(Buffer.from(vaa.serializedVaa, "base64"))
          )
      }
      const chains = useAppSelector((state) => state.blockchainReducer.chains)

      const senderChain = valuesWithKey(chains).find(
          ({ chain }) => chain === deserializedVaa?.emitterChain
      )
      const targetChain = valuesWithKey(chains).find(
          ({ chain }) => chain === deserializedVaa?.payload.to.chain
      )

      const senderChainKey = senderChain?.key ?? defaultChainKey
      const targetChainKey = targetChain?.key ?? defaultSecondaryChainKey

      const minimalFee = Object.values(
          crosschainConfig()[senderChainKey][targetChainKey]
      )[0].minimalFee
      const initialValues: BridgeRedeemFormikValues = {
          nativeAmountPlusFee: minimalFee,
      }

      const dispatch = useAppDispatch()

      const baseAccounts = useAppSelector(
          (state) => state.authReducer.baseAccounts
      )
      const activePrivateKey = baseAccounts[targetChainKey]?.activePrivateKey
      const accountAddress =
      baseAccounts[targetChainKey]?.accounts[activePrivateKey].accountAddress

      const { balanceSwr: nativeTokenBalanceSwr } = useBalance({
          tokenKey: nativeTokenKey,
          accountAddress,
          chainKey: targetChain?.key ?? defaultSecondaryChainKey,
      })

      const validationSchema = Yup.object({
          nativeAmountPlusFee:
        nativeTokenBalanceSwr.data !== undefined
            ? Yup.number().max(
                nativeTokenBalanceSwr.data,
                `Your native balance is insufficient (Required: ${minimalFee} SYMBOL)`
            )
            : Yup.number(),
      })

      const network = useAppSelector((state) => state.blockchainReducer.network)

      const signer = useGenericSigner(
          targetChain?.key,
          deserializedVaa?.payload.to.address
              ? toWormholeNativeFromUniversal(
                  targetChain?.chain ?? defaultSecondaryChain,
                  deserializedVaa.payload.to.address
              )
              : ""
      )
    
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
              dispatch(useVaa(selectedKey))
          },
      })

      return formik
  }

export const useBridgeRedeemFormik = () => {
    const { bridgeRedeemFormik } = useFormiks()
    return bridgeRedeemFormik
}
