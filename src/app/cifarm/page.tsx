"use client"
import { Container } from "@/components"
import { Spinner } from "@nextui-org/react"
import React from "react"
import { useNakama } from "./useNakama"
import { UnityCanvas } from "./UnityCanvas"

const Page = () => {
    const { session } = useNakama()

    return (
        <Container centerContent>
            {!session ? (
                <Spinner label="Authenticating..." size="lg" />
            ) : (
                <UnityCanvas />
            )}
        </Container>
    )
}

export default Page
