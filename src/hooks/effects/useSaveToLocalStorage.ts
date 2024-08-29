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

    const storedVaas = useAppSelector((state) => state.vaaReducer.storedVaas)

    const chains = useAppSelector((state) => state.chainReducer.chains)

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
        saveChains(chains)
    }, [chains])
}
