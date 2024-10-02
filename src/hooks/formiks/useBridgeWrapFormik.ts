import { FormikProps, useFormik } from "formik"
import * as Yup from "yup"
import { useFormiks } from "."
import { useAppSelector } from "@/redux"
import { nativeTokenKey } from "@/config"
import { useEffect } from "react"
import { createAttestation, parseNetwork, submitAttestation } from "@/services"
import { useSigner } from "../miscellaneous"

export interface BridgeWrapFormikValues {
  tokenKey: string;
  targetChainKey: string;
}

export const _useBridgeWrapFormik = (): FormikProps<BridgeWrapFormikValues> => {
    const preferenceChainKey = useAppSelector(
        (state) => state.blockchainReducer.preferenceChainKey
    )

    const initialValues: BridgeWrapFormikValues = {
        tokenKey: nativeTokenKey,
        targetChainKey: "",
    }
    const chains = useAppSelector((state) => state.blockchainReducer.chains)
    const network = useAppSelector((state) => state.blockchainReducer.network)
    const tokens = chains[preferenceChainKey].tokens

    const wrappedTokens = useAppSelector(
        (state) => state.resultReducer.bridge.wrappedTokens
    )
    const remainingChains = Object.values(chains)
        .filter((chain) => chain.key !== preferenceChainKey)
        .filter(
            (chain) =>
                !Object.values(wrappedTokens)
                    .map((wrappedToken) => wrappedToken.key)
                    .includes(chain.key)
        )

    useEffect(() => {
        if (!remainingChains.length) return
        formik.setFieldValue("targetChainKey", remainingChains[0].key)
    }, [])

    const validationSchema = Yup.object({
    //
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async ({ tokenKey, targetChainKey }) => {
            const sourceChainName = chains[preferenceChainKey].chain
            const targetChainName = chains[targetChainKey].chain
            const tokenAddress = tokens[tokenKey].addresses[network]

            if (!signer) return
            if (!targetSigner) return

            const { txHash, vaa } = await createAttestation({
                network: parseNetwork(network),
                chainName: sourceChainName,
                tokenAddress,
                signer,
            })
            console.log(`Created attestation successfully.Tx hash: ${txHash}`)
            if (!vaa) return

            const submitTxHash = await submitAttestation({
                vaa,
                network: parseNetwork(network),
                signer: targetSigner,
                targetChainName,
            })
            console.log(`Submit attestation successfully.Tx hash: ${submitTxHash}`)
        },
    })

    const signer = useSigner(preferenceChainKey)
    const targetSigner = useSigner(formik.values.targetChainKey)

    return formik
}

export const useBridgeWrapFormik = () => {
    const { bridgeWrapFormik } = useFormiks()
    return bridgeWrapFormik
}