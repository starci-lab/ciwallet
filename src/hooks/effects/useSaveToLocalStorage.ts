import { addStoredVaa, useAppDispatch, useAppSelector } from "@/redux"
import { saveAccountNumbers, saveTokens, saveVaas } from "@/services"
import { useEffect } from "react"

export const useSaveToLocalStorage = () => {
    const { loaded, accountNumbers } = useAppSelector(
        (state) => state.authReducer
    )

    const vaa = useAppSelector(
        (state) => state.resultReducer.bridge.transfer?.vaa
    )

    const dispatch = useAppDispatch()

    const storedVaas = useAppSelector((state) => state.vaaReducer.storedVaas)

    const tokens = useAppSelector((state) => state.tokenReducer.tokens)

    useEffect(() => {
        if (loaded) {
            saveAccountNumbers(accountNumbers)
        }
    }, [loaded])

    useEffect(() => {
        if (vaa) {
            dispatch(addStoredVaa(vaa))
        }
    }, [vaa])

    useEffect(() => {
        if (storedVaas.length) {
            saveVaas(storedVaas)
        }
    }, [storedVaas])

    useEffect(() => {
        if (tokens.aptos.tokens.length === 1 && tokens.solana.tokens.length === 1)
            return
        saveTokens(tokens)
    }, [tokens])
}
