import { addStoredVaa, useAppDispatch, useAppSelector } from "@/redux"
import { saveAccountNumbers, saveChains, saveVaas } from "@/services"
import { useEffect } from "react"

export const useSaveToLocalStorage = () => {
    const accountNumbers = useAppSelector(
        (state) => state.authReducer.accountNumbers
    )

    const vaa = useAppSelector(
        (state) => state.resultReducer.bridge.transfer?.vaa
    )

    const dispatch = useAppDispatch()
    
    const saveAccountNumbersKey = useAppSelector((state) => state.authReducer.saveAccountNumbersKey)
    const storedVaas = useAppSelector((state) => state.vaaReducer.storedVaas)
    const saveStoredVaasKey = useAppSelector((state) => state.vaaReducer.saveStoredVaasKey)

    const chains = useAppSelector((state) => state.blockchainReducer.chains)
    const saveChainsKey = useAppSelector((state) => state.blockchainReducer.saveChainsKey)
    
    useEffect(() => {
        if (saveAccountNumbersKey) {
            console.log(`Saving account numbers: ${Object.keys(accountNumbers).length}`)
            saveAccountNumbers(accountNumbers)
        }
    }, [saveAccountNumbersKey])

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
