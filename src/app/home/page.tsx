"use client"

import React from "react"
import { Container } from "@/components"
import { Card, CardBody, User } from "@nextui-org/react"
import { useSettingsModalDisclosure } from "@/hooks"

const Page = () => {
    const { onOpen } = useSettingsModalDisclosure()
    return (
        <Container centerContent hasPadding>
            <div className="flex items-center justify-between">
                <Card disableRipple isPressable onPress={onOpen} shadow="none">
                    <CardBody className="p-0">
                        <User name="John Doe" description="Software Engineer" />
                    </CardBody>
                </Card>
            </div>
        </Container>
    )
}

export default Page
