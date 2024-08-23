import { useAppSelector } from "@/redux"
import { saveAccountNumbers } from "@/services"
import { useEffect, useRef } from "react"

export const useSaveToLocalStorage = () => {
    const accountNumbers = useAppSelector(
        (state) => state.authReducer.accountNumbers
    )

    const firstMount = useRef(false)
    useEffect(() => {
        if (!firstMount.current) {
            firstMount.current = true  
            return
        }
        saveAccountNumbers(accountNumbers)
    }, [accountNumbers])
}
