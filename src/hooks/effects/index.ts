
import { useCredentials } from "./useCredentials"
import { useLoadFromLocalStorage } from "./useLoadFromLocalStorage"
import { useSaveToLocalStorage } from "./useSaveToLocalStorage"

export const useEffects = () => {
    useLoadFromLocalStorage()
    useCredentials()
    useSaveToLocalStorage()
}

