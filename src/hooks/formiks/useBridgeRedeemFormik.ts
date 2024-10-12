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
import { useGenericSigner } from "../miscellaneous"
import { deserialize, VAA } from "@wormhole-foundation/sdk"

export interface BridgeRedeemFormikValues {
  dump: "";
}

export const _useBridgeRedeemFormik =
  (): FormikProps<BridgeRedeemFormikValues> => {
      const initialValues: BridgeRedeemFormikValues = {
          dump: "",
      }

      const dispatch = useAppDispatch()

      const chains = useAppSelector((state) => state.blockchainReducer.chains)

      const validationSchema = Yup.object({
      //
      })

      const network = useAppSelector((state) => state.blockchainReducer.network)

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
     

      const targetChain = Object.values(chains).find(({ chain }) => chain === deserializedVaa?.payload.to.chain)
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
