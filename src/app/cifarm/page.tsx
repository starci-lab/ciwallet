"use client"
import { Container } from "@/components"
import React from "react"
import { UnityCanvas } from "./UnityCanvas"
import { useCifarmDb } from "@/hooks"
import { Loading } from "./Loading"

const Page = () => {
    const { loaded } = useCifarmDb()
    return (
        <Container centerContent>
            { loaded ? <UnityCanvas /> : <Loading /> }
        </Container>
    )
}

export default Page
