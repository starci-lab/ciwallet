import { addStoredVaa, useAppDispatch, useAppSelector } from "@/redux"
import { saveAccountNumbers, saveVaas } from "@/services"
import { useEffect } from "react"

export const useSaveToLocalStorage = () => {
    const accountNumbers = useAppSelector(
        (state) => state.authReducer.accountNumbers
    )

    const vaa = useAppSelector(
        (state) => state.resultReducer.bridge.transfer?.vaa
    )

    const dispatch = useAppDispatch()

    const storedVaas = useAppSelector(
        (state) => state.vaaReducer.storedVaas
    )

    useEffect(() => {
        if (accountNumbers.loaded) {
            saveAccountNumbers(accountNumbers)
        }
    }, [accountNumbers.loaded])

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
}
