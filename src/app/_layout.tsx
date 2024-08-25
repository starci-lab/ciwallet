"use client"

import React, { PropsWithChildren } from "react"
import { NextUIProvider } from "@nextui-org/react"
import { HooksProvider } from "@/hooks"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "@/redux"
import { Modals } from "@/components"
import { TestProvider } from "@/tests"

export const WrappedLayout = ({
    children,
}: PropsWithChildren) => {
    return (
        <TestProvider isTesting={false}>
            <NextUIProvider>
                <ReduxProvider store={store}>
                    <HooksProvider>
                        {children}
                        <Modals/>
                    </HooksProvider>  
                </ReduxProvider>      
            </NextUIProvider>
        </TestProvider>
        
    )
}