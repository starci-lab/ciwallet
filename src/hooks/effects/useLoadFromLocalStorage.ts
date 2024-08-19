import { constantConfig } from "@/config"
import {
    setAccountNumber,
    setMnemonic,
    setHasAuthBefore,
    useAppDispatch,
    useAppSelector,
} from "@/redux"
import {
    foundEncryptedMnemonic,
    loadAccountNumber,
    loadMnemonic,
} from "@/services"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export const useLoadFromLocalStorage = () => {
    const dispatch = useAppDispatch()

    const password = useAppSelector((state) => state.authReducer.password)
    
    const router = useRouter()

    useEffect(() => {
        const found = foundEncryptedMnemonic()
        dispatch(setHasAuthBefore(found))
        if (found) {
            router.push(constantConfig().path.password)
        }
    }, [])

    useEffect(() => {
        const accountNumber = loadAccountNumber()
        dispatch(setAccountNumber(accountNumber))
    }, [])

    useEffect(() => {
        if (!password) return
        const handleEffect = async () => {
            const mnemonic = await loadMnemonic(password)
            dispatch(setMnemonic(mnemonic))
        }
        handleEffect()
    }, [password])
}
