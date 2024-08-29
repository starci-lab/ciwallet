import { constantConfig } from "@/config"
import {
    setAccountNumbers,
    setMnemonic,
    setHasAuthBefore,
    useAppDispatch,
    useAppSelector,
    setPreferenceChainKey,
    setVaas,
    setChain
} from "@/redux"
import {
    foundEncryptedMnemonic,
    loadAccountNumbers,
    loadChains,
    loadMnemonic,
    loadPreferenceChainKey,
    loadVaas,
    savePreferenceChainKey,
} from "@/services"
import { loadAccountNumbers as reduxLoadAccountNumbers } from "@/redux"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"

export const useLoadFromLocalStorage = () => {
    const dispatch = useAppDispatch()

    const password = useAppSelector((state) => state.authReducer.password)
    const preferenceChainKey = useAppSelector((state) => state.chainReducer.preferenceChainKey)
    
    const router = useRouter()

    useEffect(() => {
        const found = foundEncryptedMnemonic()
        dispatch(setHasAuthBefore(found))
        if (found) {
            router.push(constantConfig().path.password)
        }
    }, [])

    useEffect(() => {
        const accountNumbers = loadAccountNumbers()
        if (accountNumbers !== null) {
            dispatch(setAccountNumbers(accountNumbers))
        }   
        dispatch(reduxLoadAccountNumbers())
    }, [])

    useEffect(() => {
        const vaas = loadVaas()
        if (vaas !== null) {
            dispatch(setVaas(vaas))
        } 
    }, [])

    useEffect(() => {
        const chains = loadChains()
        if (chains !== null) {
            dispatch(setChain(chains))
        } 
    }, [])

    useEffect(() => {
        if (!password) return
        const mnemonic = loadMnemonic(password)
        dispatch(setMnemonic(mnemonic))
        router.push(constantConfig().path.home)
    }, [password])

    const firstMount = useRef(false)
    useEffect(() => {
        if (!firstMount.current) {
            dispatch(setPreferenceChainKey(loadPreferenceChainKey()))
            firstMount.current = true  
            return
        }
        if (!preferenceChainKey) return
        savePreferenceChainKey(preferenceChainKey)
    }, [preferenceChainKey])
    
}
