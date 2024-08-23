import { useAppSelector } from "@/redux"
import { saveAccountNumbers } from "@/services"
import { useEffect } from "react"

export const useSaveToLocalStorage = () => {
    const accountNumbers = useAppSelector(
        (state) => state.authReducer.accountNumbers
    )

    useEffect(() => {
        if (accountNumbers.loaded) {
            saveAccountNumbers(accountNumbers)
        }
    }, [accountNumbers.loaded])
}
