import { constantConfig } from "@/config"
import {
    setBaseAccounts,
    setMnemonic,
    setHasAuthBefore,
    useAppDispatch,
    useAppSelector,
    setPreferenceChainKey,
    setVaas,
    setChain,
    setInitialized,
    setBotTypeInit
} from "@/redux"
import {
    BotType,
    foundEncryptedBaseAccounts,
    foundEncryptedMnemonic,
    loadBaseAccounts,
    loadChains,
    loadMnemonic,
    loadPreferenceChainKey,
    loadVaas,
    savePreferenceChainKey,
} from "@/services"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import { triggerErrorToast } from "@/toasts"

export const useLoadFromLocalStorage = () => {
    const dispatch = useAppDispatch()

    const password = useAppSelector((state) => state.authReducer.password)
    const preferenceChainKey = useAppSelector((state) => state.blockchainReducer.preferenceChainKey)

    const router = useRouter()

    useEffect(() => {
        const foundMnemonic = foundEncryptedMnemonic()
        const foundBaseAccounts = foundEncryptedBaseAccounts()
        const found = foundMnemonic && foundBaseAccounts

        if (found) {
            router.push(constantConfig().path.password)
        } else {
            router.push(constantConfig().path.auth)
        }
        
        dispatch(setHasAuthBefore(found))
        dispatch(setInitialized(true))
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

    const botTypeInit = useAppSelector(state => state.authReducer.botTypeInit)

    useEffect(() => {
        if (!password) return
        try{
            // load mnemonic
            const mnemonic = loadMnemonic(password)
            dispatch(setMnemonic(mnemonic))
            // load base accounts
            const baseAccounts = loadBaseAccounts(password)
            // sure that baseAccounts is not null
            if (baseAccounts === null) return
            dispatch(setBaseAccounts(baseAccounts))

            switch (botTypeInit) {
            case BotType.Cifarm: {
                router.push(constantConfig().path.cifarm)
                dispatch(setBotTypeInit())
                break
            }
            default: {
                router.push(constantConfig().path.home)
                break
            }
            }
            
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
