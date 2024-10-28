import { use } from "react"
import { HooksContext } from "../provider.hooks"
import { UseCifarmNakamaReturn, _useCifarmNakama } from "./useCifarmNakama"
import { _useCifarmDb, UseCifarmDbReturn } from "./useCifarmDb"

export interface UseBaseReturn {
    cifarmNakama: UseCifarmNakamaReturn
    cifarmDb: UseCifarmDbReturn
}

export const _useBase = () : UseBaseReturn => {
    const cifarmNakama = _useCifarmNakama()
    const cifarmDb = _useCifarmDb()
    return {
        cifarmNakama,
        cifarmDb
    }
}

export const useBase = () => {
    const { base } = use(HooksContext)!
    return base
}

export * from "./useCifarmNakama"
export * from "./useCifarmDb"
