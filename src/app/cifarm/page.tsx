"use client"
import { Container } from "@/components"
import { useCifarmNakama } from "@/hooks"
import { Spinner } from "@nextui-org/react"
import React from "react"

const Page = () => {
    const { cifarmAuthSwr } = useCifarmNakama()
    return (
        <Container centerContent hasPadding>
            {cifarmAuthSwr.isMutating ? (
                <Spinner label="Authenticating..." size="lg" />
            ) : null}
        </Container>
    )
}

export default Page
