import { useGames } from ".."
import { UseCifarmNakamaReturn, _useCifarmNakama } from "./useCifarmNakama"

export interface UseCifarmReturn {
    nakama: UseCifarmNakamaReturn;
}
export const _useCifarm = () => {
    const nakama = _useCifarmNakama()
    return {
        nakama
    }
}

export const useCifarm = () => {
    const { cifarm } = useGames()
    return cifarm
}

export * from "./useCifarmNakama"