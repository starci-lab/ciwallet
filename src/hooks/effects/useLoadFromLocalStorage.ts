import { constantConfig } from "@/config"
import {
    setAccountNumbers,
    setMnemonic,
    setHasAuthBefore,
    useAppDispatch,
    useAppSelector,
    setPreferenceChainKey,
} from "@/redux"
import {
    foundEncryptedMnemonic,
    loadAccountNumbers,
    loadMnemonic,
    loadPreferenceChainKey,
    savePreferenceChainKey,
} from "@/services"
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
