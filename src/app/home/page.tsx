"use client"

import React from "react"
import { BalanceSummaryInUSD, Container } from "@/components"
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
    Tabs,
    Tab,
} from "@nextui-org/react"
import {
    useSelectNetworkModalDisclosure,
    useAccountsModalDisclosure,
} from "@/hooks"
import { constantConfig } from "@/config"
import {
    AssetsTab,
    switchAssetsTab,
    triggerRefreshBalance,
    useAppDispatch,
    useAppSelector,
} from "@/redux"
import {
    BellIcon,
    Cog6ToothIcon,
    PaperAirplaneIcon,
    PlusIcon,
    QrCodeIcon,
} from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"
import { RefreshCcwIcon, SendToBackIcon } from "lucide-react"
import { truncateString } from "@/utils"
import { Tokens } from "./Tokens"
import { NFTs } from "./NFTs"

const Page = () => {
    const { onOpen } = useAccountsModalDisclosure()
    const preferenceChainKey = useAppSelector(
        (state) => state.blockchainReducer.preferenceChainKey
    )
    const router = useRouter()

    const address = useAppSelector(
        (state) => state.authReducer.credentials[preferenceChainKey].address
    )

    const assetsTab = useAppSelector((state) => state.tabReducer.assetsTab)

    const accounts = useAppSelector(
        (state) => state.authReducer.accountNumbers[preferenceChainKey].accounts
    )
    const activeAccountNumber = useAppSelector(
        (state) =>
            state.authReducer.accountNumbers[preferenceChainKey].activeAccountNumber
    )

    const { name, imageUrl } = accounts[activeAccountNumber]

    const { onOpen: onSelectNetworkModalOpen } =
    useSelectNetworkModalDisclosure()

    const chains = useAppSelector((state) => state.blockchainReducer.chains)
    const dispatch = useAppDispatch()

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
                        <Link
                            as="button"
                            onPress={() => router.push(constantConfig().path.settings)}
                            color="foreground"
                        >
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
                                src={chains[preferenceChainKey].imageUrl}
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
                            onPress={() => router.push(constantConfig().path.tokenBridge)}
                            variant="flat"
                            isIconOnly
                        >
                            <PaperAirplaneIcon className="w-5 h-5" />
                        </Button>
                    </Tooltip>
                    <Tooltip content="Bridge">
                        <Button
                            onPress={() => router.push(constantConfig().path.tokenBridge)}
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
            <div>
                <Link
                    onPress={() => router.push(constantConfig().path.cifarm)}
                    as="button"
                    className="flex"
                >
                    <Image removeWrapper src="/icons/cifarm.png" className="w-16 h-16" />
                </Link>
            </div>
            <Spacer y={6} />
            <div className="flex items-center justify-between">
                <Tabs
                    selectedKey={assetsTab}
                    onSelectionChange={(key) =>
                        dispatch(switchAssetsTab(key as AssetsTab))
                    }
                >
                    <Tab title="Tokens" key={AssetsTab.Tokens} />
                    <Tab title="NFTs" key={AssetsTab.NFTs} />
                </Tabs>
                <div className="flex gap-2">
                    <Link as="button" onPress={() => dispatch(triggerRefreshBalance())}>
                        <RefreshCcwIcon strokeWidth={1.5} className="w-5 h-5" />
                    </Link>
                    <Link as="button">
                        <PlusIcon className="w-5 h-5" />
                    </Link>
                </div>
            </div>
            <Spacer y={4} />
            {assetsTab === AssetsTab.Tokens ? <Tokens /> : <NFTs />}
        </Container>
    )
}

export default Page
