"use client"

import React, { PropsWithChildren } from "react"
import { NextUIProvider } from "@nextui-org/react"
import { HooksProvider } from "@/hooks"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "@/redux"

export const WrappedLayout = ({
    children,
}: PropsWithChildren) => {
    return (
        <NextUIProvider>
            <ReduxProvider store={store}>
                <HooksProvider>
                    {children}
                </HooksProvider>  
            </ReduxProvider>      
        </NextUIProvider>
    )
}