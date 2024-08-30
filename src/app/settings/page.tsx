"use client"
import { Container } from "@/components"
import { useMnemonicModalDisclosure, usePrivateKeyModalDisclosure, useWarningModalDisclosure } from "@/hooks"
import { KeyIcon } from "@heroicons/react/24/outline"
import { Spacer, Link, Card, CardBody, CardHeader, Button } from "@nextui-org/react"
import { ArrowLeftIcon, SproutIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import React from "react"
import { DarkModeSwitch } from "./DarkModeSwitch"
import { constantConfig } from "@/config"
import { setWarning, useAppDispatch } from "@/redux"

const Page = () => {
    const router = useRouter()
    const { onOpen: onMnemonicModalOpen }  = useMnemonicModalDisclosure()
    const { onOpen: onPrivateKeyModalOpen }  = usePrivateKeyModalDisclosure()
    const { onOpen: onWarningModalOpen, isOpen }  = useWarningModalDisclosure()
    const dispatch = useAppDispatch()
    return (
        <Container hasPadding>
            <div className="flex flex-col gap-6 h-full w-full justify-between">
                <div>
                    <div className="flex gap-2 items-center">
                        <Link as="button" onPress={() => router.back()} color="foreground">
                            <ArrowLeftIcon className="w-6 h-6" />
                        </Link>
                        <div className="text-2xl font-bold">Settings</div>
                    </div>
                    <Spacer y={4} />
                    <div className="text-xs text-foreground-400">
            Settings
                    </div>
                    <Spacer y={12} />
                    <Card>
                        <CardHeader>
                            <div>
                                <div className="text-large font-bold">Security</div>
                                <div className="text-xs text-foreground-400">Manage your security settings</div>
                            </div> 
                        </CardHeader>
                        <CardBody className="gap-2">
                            <Button onPress={() => onMnemonicModalOpen()} className="justify-start" variant="flat">
                                <div className="flex gap-2 items-center">
                                    <SproutIcon strokeWidth={1.5} className="w-5 h-5" />
                                    <div className="text-sm">Mnemonic</div>
                                </div>
                            </Button>
                            <Button onPress={() => onPrivateKeyModalOpen()} className="justify-start" variant="flat">
                                <div className="flex gap-2 items-center">
                                    <KeyIcon className="w-5 h-5" />
                                    <div className="text-sm">Private Key</div>
                                </div>       
                            </Button>
                        </CardBody>
                    </Card>
                    <Spacer y={6} />
                    <Card>
                        <CardHeader>
                            <div>
                                <div className="text-large font-bold">Theme</div>
                                <div className="text-xs text-foreground-400">Customize visual appearance and design elements to enhance user experience.</div>
                            </div> 
                        </CardHeader>
                        <CardBody className="gap-2">
                            <div className="flex items-center justify-between">
                                <div className="text-sm">Mode</div>
                                <DarkModeSwitch />
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className="grid gap-2">
                    <Button color="danger" onPress={() => router.push(constantConfig().path.password)} variant="bordered"> Lock </Button>
                    <Button color="danger" onPress={() => {
                        dispatch(setWarning({
                            warningMessage: "Are you sure you want to sign out?",
                            processFn: () => { router.push(constantConfig().path.auth) }
                        }))
                        onWarningModalOpen()
                    }}> Sign Out</Button>
                </div>
                
            </div>
        </Container>
    )
}

export default Page
