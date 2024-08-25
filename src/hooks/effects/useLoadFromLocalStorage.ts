import { constantConfig } from "@/config"
import {
    setAccountNumbers,
    setMnemonic,
    setHasAuthBefore,
    useAppDispatch,
    useAppSelector,
    setPreferenceChainKey,
    setVaas,
    setTokens,
} from "@/redux"
import {
    foundEncryptedMnemonic,
    loadAccountNumbers,
    loadMnemonic,
    loadPreferenceChainKey,
    loadTokens,
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
        const tokens = loadTokens()
        if (tokens !== null) {
            dispatch(setTokens(tokens))
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
