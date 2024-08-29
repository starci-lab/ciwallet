"use client"

import React, { PropsWithChildren, useEffect } from "react"
import { case2 } from "./fns"

export interface TestProviderProps extends PropsWithChildren {
    isTesting: boolean
}

export const TestProvider = ({ children, isTesting } : TestProviderProps) => {
    useEffect(() => {
        const handleEffect = async () => {
            if (!isTesting) return
            // Test code here
            // case1()
            case2()
        }
        handleEffect()
    }, [])
    return <>{!isTesting ? children : null}</>
}