import { useBalances } from "./useBalances"
import { useCredentials } from "./useCredentials"
import { useLoadFromLocalStorage } from "./useLoadFromLocalStorage"

export const useEffects = () => {
    useLoadFromLocalStorage()
    useCredentials()
    useBalances()
}

