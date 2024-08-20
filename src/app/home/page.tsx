"use client"

import React from "react"
import { BalanceSummaryInUSD, Container } from "@/components"
import { Card, CardBody, User, Image, Button, Link, Spacer, Tooltip } from "@nextui-org/react"
import { useSettingsModalDisclosure } from "@/hooks"
import { chainConfig, constantConfig } from "@/config"
import { useAppSelector } from "@/redux"
import { BellIcon, Cog6ToothIcon, PaperAirplaneIcon, QrCodeIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"
import { SendToBackIcon } from "lucide-react"

const Page = () => {
    const { onOpen } = useSettingsModalDisclosure()
    const preferenceChainKey = useAppSelector(state => state.chainReducer.preferenceChainKey)
    const router = useRouter()

    return (
        <Container centerContent hasPadding>
            <div className="w-full">
                <div className="flex items-center justify-between">
                    <Card disableRipple isPressable onPress={onOpen} shadow="none">
                        <CardBody className="p-0">
                            <User name="John Doe" description="Software Engineer" />
                        </CardBody>
                    </Card>
                    <div className="flex gap-2 items-center">
                        <Link as="button" color="foreground">
                            <Cog6ToothIcon className="w-5 h-5" />
                        </Link>
                        <Link as="button" color="foreground">
                            <BellIcon className="w-5 h-5" />
                        </Link>
                        <Button isIconOnly variant="flat">
                            <Image
                                className="w-5 h-5"
                                src={
                                    chainConfig().chains.find(({ key }) => key === preferenceChainKey)
                                        ?.imageUrl
                                }
                            />
                        </Button>
                    </div>
                </div>
                <Spacer y={6} />
                <BalanceSummaryInUSD/>
                <Spacer y={6} />
                <div className="flex gap-2">
                    <Tooltip content="Transfer">
                        <Button onPress={() => router.push(constantConfig().path.bridge)} variant="flat" isIconOnly>
                            <PaperAirplaneIcon className="w-5 h-5"/>
                        </Button>
                    </Tooltip>    
                    <Tooltip content="Bridge">
                        <Button onPress={() => router.push(constantConfig().path.bridge)} variant="flat" isIconOnly>
                            <SendToBackIcon strokeWidth={1.5} className="w-5 h-5"/>
                        </Button>
                    </Tooltip>  
                    <Tooltip content="Receive">
                        <Button variant="flat" isIconOnly>
                            <QrCodeIcon className="w-5 h-5"/>
                        </Button>
                    </Tooltip> 
                </div>
            </div>
        </Container>
    )
}

export default Page
