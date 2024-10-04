import { useCredentials } from "./useCredentials"
import { useLoadFromLocalStorage } from "./useLoadFromLocalStorage"
import { useSaveToLocalStorage } from "./useSaveToLocalStorage"
import { useTelegramMiniApp } from "./useTelegramMiniApp"

export const useEffects = () => {
    useLoadFromLocalStorage()
    useCredentials()
    useSaveToLocalStorage()
    useTelegramMiniApp()
}

