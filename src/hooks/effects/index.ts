import { useLoadFromLocalStorage } from "./useLoadFromLocalStorage"

export const useEffects = () => {
    useLoadFromLocalStorage()
}

export * from "./useLoadFromLocalStorage"
