"use client"
import { Container } from "@/components"
import { constantConfig } from "@/config"
import { Button, Image, Spacer } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import React from "react"

const Page = () => {
    const router = useRouter()

    return (
        <Container centerContent hasPadding>
            <div className="w-full">
                <div className="grid place-items-center gap-4 w-full">
                    <Image removeWrapper src="/logo.svg" height={150} />
                </div>
                <Spacer y={12} />
                <div className="grid gap-4 w-full">
                    <Button
                        variant="flat"
                        onPress={() => router.push(constantConfig().path.mnemonic)}
                    >
            Create
                    </Button>
                    <Button
                        variant="flat"
                        onPress={() => router.push(constantConfig().path.mnemonicInput)}
                    >
            Import
                    </Button>
                </div>
            </div>
        </Container>
    )
}

export default Page
