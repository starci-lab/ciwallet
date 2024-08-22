import { useAddresses } from "./useAddresses"
import { useLoadFromLocalStorage } from "./useLoadFromLocalStorage"

export const useEffects = () => {
    useLoadFromLocalStorage()
    useAddresses()
}

