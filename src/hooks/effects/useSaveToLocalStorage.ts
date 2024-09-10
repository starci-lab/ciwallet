import { addStoredVaa, useAppDispatch, useAppSelector } from "@/redux"
import { saveAccountNumbers, saveChains, saveVaas } from "@/services"
import { useEffect } from "react"

export const useSaveToLocalStorage = () => {
    const loaded = useAppSelector(
        (state) => state.authReducer.loaded
    )
    const accountNumbers = useAppSelector(
        (state) => state.authReducer.accountNumbers
    )

    const vaa = useAppSelector(
        (state) => state.resultReducer.bridge.transfer?.vaa
    )

    const dispatch = useAppDispatch()

    const storedVaas = useAppSelector((state) => state.vaaReducer.storedVaas)
    const saveStoredVaasKey = useAppSelector((state) => state.vaaReducer.saveStoredVaasKey)

    const chains = useAppSelector((state) => state.blockchainReducer.chains)
    const saveChainsKey = useAppSelector((state) => state.blockchainReducer.saveChainsKey)
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
