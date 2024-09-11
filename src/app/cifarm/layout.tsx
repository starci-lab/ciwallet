"use client"

import React, { PropsWithChildren } from "react"
import { HooksProvider } from "./provider.hooks"

const Layout = ({ children }: PropsWithChildren) => {
    return <HooksProvider>{children}</HooksProvider>
}

export default Layout
