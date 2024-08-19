"use client"
import { constantConfig } from "@/config"
import { Button } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import React from "react"

const Page = () => {
    const router = useRouter()

    return (
        <div>
            <Button onPress={() => router.push(constantConfig().path.create)}>
        Create
            </Button>
            <Button>Import</Button>
        </div>
    )
}

export default Page
