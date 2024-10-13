import { useCurrent } from "./useCurrent"
import { useLoadFromLocalStorage } from "./useLoadFromLocalStorage"
import { useSaveToLocalStorage } from "./useSaveToLocalStorage"
import { useTelegramMiniApp } from "./useTelegramMiniApp"

export const useEffects = () => {
    useLoadFromLocalStorage()
    useSaveToLocalStorage()
    useTelegramMiniApp()
    useCurrent()
}