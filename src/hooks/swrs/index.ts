import { useAccount } from "./useAccount"

export const useSwrs = () => {
    const account = useAccount()
    return {
        account
    }
}