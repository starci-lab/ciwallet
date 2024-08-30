"use client"

import React, { PropsWithChildren } from "react"
import { NextUIProvider } from "@nextui-org/react"
import { HooksProvider } from "@/hooks"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "@/redux"
import { Modals } from "@/components"
import { TestProvider } from "@/tests"
import { ToastContainer } from "@/toasts"
import {ThemeProvider as NextThemesProvider} from "next-themes"

export const WrappedLayout = ({
    children,
}: PropsWithChildren) => {
    return (
        <TestProvider isTesting={false}>
            <NextUIProvider>
                <ReduxProvider store={store}>  
                    <NextThemesProvider attribute="class" enableSystem>
                        <HooksProvider>
                            {children}
                            <Modals/>
                        </HooksProvider> 
                    </NextThemesProvider>            
                    <ToastContainer/>
                </ReduxProvider>      
            </NextUIProvider>
        </TestProvider>
        
    )
}