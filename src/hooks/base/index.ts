import { use } from "react"
import { HooksContext } from "../provider.hooks"
import { UseCifarmNakamaReturn, _useCifarmNakama } from "./useCifarmNakama"

export interface UseBaseReturn {
    cifarmNakama: UseCifarmNakamaReturn
}

export const _useBase = () : UseBaseReturn => {
    const cifarmNakama = _useCifarmNakama()

    return {
        cifarmNakama
    }
}

export const useBase = () => {
    const { base } = use(HooksContext)!
    return base
}

export * from "./useCifarmNakama"

