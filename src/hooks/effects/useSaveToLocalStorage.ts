import { addStoredVaa, useAppDispatch, useAppSelector } from "@/redux"
import { saveAccountNumbers, saveChains, saveVaas } from "@/services"
import { useEffect } from "react"

export const useSaveToLocalStorage = () => {
    const { loaded, accountNumbers } = useAppSelector(
        (state) => state.authReducer
    )

    const vaa = useAppSelector(
        (state) => state.resultReducer.bridge.transfer?.vaa
    )

    const dispatch = useAppDispatch()

    const { storedVaas, saveStoredVaasKey } = useAppSelector((state) => state.vaaReducer)

    const { chains, saveChainsKey } = useAppSelector((state) => state.chainReducer)

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
        if (!saveStoredVaasKey) return
        saveVaas(storedVaas)
    }, [saveStoredVaasKey])

    useEffect(() => {
        if (!saveChainsKey) return
        saveChains(chains)
    }, [saveChainsKey])
}
