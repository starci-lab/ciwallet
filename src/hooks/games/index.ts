import { use } from "react"
import { HooksContext } from "../provider.hooks"
import { UseCifarmReturn, _useCifarm } from "./cifarm"

export * from "./cifarm"

export interface UseGamesReturn {
    cifarm: UseCifarmReturn
}

export const _useGames = () => {
    const cifarm = _useCifarm()

    return {
        cifarm
    }
}

export const useGames = () => {
    const { games } = use(HooksContext)!
    return games
}