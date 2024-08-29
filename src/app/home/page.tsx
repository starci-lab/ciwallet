"use client"

import React from "react"
import { BalanceSummaryInUSD, Container, Tokens } from "@/components"
import {
    Card,
    CardBody,
    User,
    Image,
    Button,
    Link,
    Spacer,
    Tooltip,
    Snippet,
} from "@nextui-org/react"
import {
    useSelectNetworkModalDisclosure,
    useAccountsModalDisclosure,
} from "@/hooks"
import { constantConfig } from "@/config"
import { useAppSelector } from "@/redux"
import {
    BellIcon,
    Cog6ToothIcon,
    PaperAirplaneIcon,
    QrCodeIcon,
} from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"
import { SendToBackIcon } from "lucide-react"
import { truncateString } from "@/utils"

const Page = () => {
    const { onOpen } = useAccountsModalDisclosure()
    const preferenceChainKey = useAppSelector(
        (state) => state.chainReducer.preferenceChainKey
    )
    const router = useRouter()

    const { address } = useAppSelector(
        (state) => state.chainReducer.credentials[preferenceChainKey]
    )

    const { accounts, activeAccountNumber } = useAppSelector(
        (state) => state.authReducer.accountNumbers[preferenceChainKey]
    )

    const { name, imageUrl } = accounts[activeAccountNumber]

    const { onOpen: onSelectNetworkModalOpen } =
    useSelectNetworkModalDisclosure()

    const chains = useAppSelector((state) => state.chainReducer.chains)
    return (
        <Container hasPadding>
            <div className="w-full">
                <div className="flex items-center justify-between">
                    <Snippet
                        hideSymbol
                        classNames={{
                            base: "p-0 bg-inhenrit",
                        }}
                        size="sm"
                        codeString={address}
                    >
                        <Card disableRipple isPressable onPress={onOpen} shadow="none">
                            <CardBody className="p-0">
                                <User
                                    avatarProps={{
                                        src: imageUrl,
                                    }}
                                    name={
                                        <div className="flex gap-1 text-sm items-center">
                                            <div>{name}</div>
                                            <div className="text-primary">{`[${activeAccountNumber}]`}</div>
                                        </div>
                                    }
                                    description={truncateString(address)}
                                />
                            </CardBody>
                        </Card>
                    </Snippet>
                    <div className="flex gap-2 items-center">
                        <Link as="button" color="foreground">
                            <Cog6ToothIcon className="w-5 h-5" />
                        </Link>
                        <Link as="button" color="foreground">
                            <BellIcon className="w-5 h-5" />
                        </Link>
                        <Button
                            onPress={onSelectNetworkModalOpen}
                            isIconOnly
                            variant="flat"
                        >
                            <Image
                                className="w-5 h-5"
                                src={
                                    chains[preferenceChainKey].imageUrl
                                }
                            />
                        </Button>
                    </div>
                </div>
                <Spacer y={6} />
                <BalanceSummaryInUSD />
                <Spacer y={6} />
                <div className="flex gap-2">
                    <Tooltip content="Transfer">
                        <Button
                            onPress={() => router.push(constantConfig().path.bridge)}
                            variant="flat"
                            isIconOnly
                        >
                            <PaperAirplaneIcon className="w-5 h-5" />
                        </Button>
                    </Tooltip>
                    <Tooltip content="Bridge">
                        <Button
                            onPress={() => router.push(constantConfig().path.bridge)}
                            variant="flat"
                            isIconOnly
                        >
                            <SendToBackIcon strokeWidth={1.5} className="w-5 h-5" />
                        </Button>
                    </Tooltip>
                    <Tooltip content="Receive">
                        <Button variant="flat" isIconOnly>
                            <QrCodeIcon className="w-5 h-5" />
                        </Button>
                    </Tooltip>
                </div>
            </div>
            <Spacer y={6} />
            <Tokens />
        </Container>
    )
}

export default Page
