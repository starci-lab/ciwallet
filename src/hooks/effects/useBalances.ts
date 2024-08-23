import {
    setAptosBalance,
    setSolanaBalance,
    triggerRefreshAptosBalance,
    triggerRefreshSolanaBalance,
    useAppDispatch,
    useAppSelector,
} from "@/redux"
import { useEffect, useRef } from "react"
import { getAptosBalance, getSolanaBalance } from "@/services"

export const useBalances = () => {
    const { aptos, solana, network } = useAppSelector(
        (state) => state.chainReducer
    )
    const preferenceChainKey = useAppSelector(
        (state) => state.chainReducer.preferenceChainKey
    )
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!aptos.credential.address) return
        const handleEffect = async () => {
            const balance = await getAptosBalance(aptos.credential.address, network)
            dispatch(setAptosBalance(balance))
        }
        handleEffect()
    }, [aptos.balance.refreshBalanceKey, aptos.credential.address])

    useEffect(() => {
        if (!solana.credential.address) return
        const handleEffect = async () => {
            const balance = await getSolanaBalance(
                solana.credential.address,
                network
            )
            dispatch(setSolanaBalance(balance))
        }
        handleEffect()
    }, [solana.balance.refreshBalanceKey, solana.credential.address])

    const firstMount = useRef(false)
    useEffect(() => {
        if (!firstMount.current) {
            firstMount.current = true
            return
        }
        switch (preferenceChainKey) {
        case "aptos": {
            dispatch(triggerRefreshAptosBalance())
            break
        }
        case "solana": {
            dispatch(triggerRefreshSolanaBalance())
            break
        }
        default:
            break
        }
    }, [preferenceChainKey])
}
