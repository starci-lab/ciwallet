import { getAccount } from "@/services"
import { useState } from "react"
import useSWR from "swr"

const ACCOUNT = "account"

export const useAccount = () => {
    const [initialized, setInitialized] = useState(false)

    const accountSwr = useSWR(initialized ? ACCOUNT : null, async () => {
        return await getAccount({
            input: {
                public_key: "0x"
            },
            schema: {
                aptos_address: true,
            }
        })
    }) 

    const initialize = () => setInitialized(true)

    return {
        initialize,
        accountSwr
    }
}