import { constantConfig } from "@/config"
import {
    setAccountNumbers,
    setMnemonic,
    setHasAuthBefore,
    useAppDispatch,
    useAppSelector,
    setPreferenceChainKey,
    setVaas,
    setChain,
    setInitialized,
    setAlgorandMnemonics
} from "@/redux"
import {
    foundEncryptedMnemonic,
    loadAccountNumbers,
    loadAlgorandMnemonics,
    loadChains,
    loadMnemonic,
    loadPreferenceChainKey,
    loadVaas,
    savePreferenceChainKey,
} from "@/services"
import { loadAccountNumbers as reduxLoadAccountNumbers } from "@/redux"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import { triggerErrorToast } from "@/toasts"

export const useLoadFromLocalStorage = () => {
    const dispatch = useAppDispatch()

    const password = useAppSelector((state) => state.authReducer.password)
    const preferenceChainKey = useAppSelector((state) => state.blockchainReducer.preferenceChainKey)
    
    const router = useRouter()

    useEffect(() => {
        const found = foundEncryptedMnemonic()
        if (found) {
            router.push(constantConfig().path.password)
        } else {
            router.push(constantConfig().path.auth)
        }
        dispatch(setHasAuthBefore(found))
        dispatch(setInitialized(true))
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
        try{
            const mnemonic = loadMnemonic(password)
            dispatch(setMnemonic(mnemonic))

            //bonus algorand, not need to check
            const mnemonics = loadAlgorandMnemonics(password)
            dispatch(setAlgorandMnemonics(mnemonics))
            router.push(constantConfig().path.home)
        } catch (ex) {
            console.error(ex)
            triggerErrorToast("Invalid password")
        }
    }, [password])

    useEffect(() => {
        if (!password) return
        try{
            const mnemonics = loadAlgorandMnemonics(password)
            dispatch(setAlgorandMnemonics(mnemonics))
            router.push(constantConfig().path.home)
        } catch (ex) {
            console.error(ex)
            triggerErrorToast("Invalid password")
        }
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
