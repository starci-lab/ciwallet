import { FormikProps, useFormik } from "formik"
import * as Yup from "yup"
import { useFormiks } from "."
import {
    setBridgeRedeemResult,
    useAppDispatch,
    useAppSelector,
    useVaa,
} from "@/redux"
import { redeem } from "@/services"
import { useGenericSigner } from "../miscellaneous"
import { deserialize } from "@wormhole-foundation/sdk"

export interface BridgeRedeemFormikValues {
  dump: "";
}

export const _useBridgeRedeemFormik =
  (): FormikProps<BridgeRedeemFormikValues> => {
      const initialValues: BridgeRedeemFormikValues = {
          dump: "",
      }

      const dispatch = useAppDispatch()

      const chains = useAppSelector((state) => state.chainReducer.chains)

      const validationSchema = Yup.object({
      //
      })

      const network = useAppSelector((state) => state.chainReducer.network)

      const { selectedKey, storedVaas } = useAppSelector(state => state.vaaReducer)
      const vaa = storedVaas.find(({ key }) => key === selectedKey)
      const signer = useGenericSigner(vaa?.targetChainKey, vaa?.targetAddress)

      const formik = useFormik({
          initialValues,
          validationSchema,
          onSubmit: async () => {
              if (!vaa) return
              if (!signer) return
              const txHash = await redeem({
                  signer,
                  vaa: deserialize(
                      "TokenBridge:Transfer",
                      Uint8Array.from(Buffer.from(vaa.serializedVaa, "base64"))
                  ),
                  senderChainName: chains[vaa.fromChainKey].chain,
                  redeemChainName: chains[vaa.targetChainKey].chain,
                  network,
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
