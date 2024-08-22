import { setAptosBalance, useAppDispatch, useAppSelector } from "@/redux"
import { useEffect } from "react"
import { getAptosBalance } from "@/services"

export const useBalances = () => {
    const { aptos, solana, network } = useAppSelector(
        (state) => state.chainReducer
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

        }
        handleEffect()
    }, [solana.balance.refreshBalanceKey, solana.credential.address])
}