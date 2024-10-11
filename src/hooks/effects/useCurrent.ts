import { setCurrent, useAppDispatch } from "@/redux"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export const useCurrent = () => {
    const searchParams = useSearchParams()
    const current = searchParams.get("current")
    
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!current) return 
        dispatch(setCurrent(current))
    }, [current])
}