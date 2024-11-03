"use client"
import {
    defaultChain,
    defaultSecondaryChain,
    Network,
} from "@/config"
import {
    useBridgeSelectVaaModalDisclosure,
} from "@/hooks"
import { useAppSelector } from "@/redux"
import { toWormholeNativeFromUniversal } from "@/services"
import { formatDay, truncateString, valuesWithKey } from "@/utils"
import {
    Card,
    CardBody,
    Spacer,
    Image,
    Chip,
} from "@nextui-org/react"
import { deserialize } from "@wormhole-foundation/sdk"
import React from "react"

export const VAAProfile = () => {
    const { onOpen } = useBridgeSelectVaaModalDisclosure()

    const selectedKey = useAppSelector((state) => state.vaaReducer.selectedKey)
    const storedVaas = useAppSelector((state) => state.vaaReducer.storedVaas)
    const chains = useAppSelector((state) => state.blockchainReducer.chains)
    const valuesWithKeyChains = valuesWithKey(chains)

    const {
        serializedVaa,
        network,
    } = storedVaas[selectedKey]
    const { emitterChain, payload, timestamp } = deserialize(
        "TokenBridge:Transfer",
        Uint8Array.from(Buffer.from(serializedVaa, "base64"))
    )

    const fromChain = valuesWithKeyChains.find(
        ({ wormhole }) => wormhole?.chain === emitterChain
    )
    const targetChain = valuesWithKeyChains.find(
        ({ wormhole }) => wormhole?.chain === payload.to.chain
    )

    const networkChip = {
        [Network.Mainnet]: (
            <Chip variant="flat" color="primary">
        Mainnet
            </Chip>
        ),
        [Network.Testnet]: (
            <Chip variant="flat" color="secondary">
        Testnet
            </Chip>
        ),
    }
    return (
        <Card onPress={onOpen} fullWidth isPressable disableRipple>
            <CardBody className="px-3 py-2">
                <div className="w-full">
                    <div className="font-semibold">
                        {truncateString(selectedKey, 20, 0)}
                    </div>
                    <Spacer y={4} />
                    <div>
                        <div className="flex gap-1 items-center">
                            <div className="w-[80px] text-sm">Network</div>
                            {networkChip[network]}
                        </div>
                        <Spacer y={2} />
                        <div className="flex gap-2 items-center">
                            <div className="w-[80px]">Path</div>
                            <div className="flex gap-1 items-center">
                                <Image
                                    removeWrapper
                                    className="w-5 h-5"
                                    src={fromChain?.imageUrl}
                                />
                                <div className="text-sm">
                                    {fromChain?.name}
                                </div>
                            </div>
                            <div className="flex gap-2">to</div>
                            <div className="flex gap-1 items-center">
                                <Image
                                    removeWrapper
                                    className="w-5 h-5"
                                    src={targetChain?.imageUrl}
                                />
                                <div className="text-sm">
                                    {targetChain?.name}
                                </div>
                            </div>
                        </div>
                        <Spacer y={2} />
                        <div className="flex gap-1 items-center">
                            <div className="w-[80px] text-sm">Token</div>
                            <div className="text-sm">{
                                truncateString(
                                    toWormholeNativeFromUniversal(
                                        fromChain?.wormhole?.chain ?? defaultChain,
                                        payload.token.address
                                    ),
                                )}</div>
                        </div>
                        <Spacer y={2} />
                        <div className="flex gap-1 items-center">
                            <div className="w-[80px] text-sm">Amount</div>
                            <div className="text-sm">
                                {String(payload.token.amount)}
                            </div>
                        </div>
                        <Spacer y={2} />
                        <div className="flex gap-1 items-center">
                            <div className="w-[80px] text-sm">Fee</div>
                            <div className="text-sm">
                                {String(payload.fee)}
                            </div>
                        </div>
                        <Spacer y={2} />
                        <div className="flex gap-1 items-center">
                            <div className="w-[80px] text-sm">To</div>
                            <div className="text-sm">
                                {truncateString(
                                    toWormholeNativeFromUniversal(
                                        targetChain?.wormhole?.chain ?? defaultSecondaryChain,
                                        payload.to.address
                                    ),
                                )}
                            </div>
                        </div>
                        <Spacer y={2} />
                        <div className="flex gap-1 items-center">
                            <div className="text-sm min-w-[80px]">Created At</div>
                            <div className="flex gap-1 items-center text-sm">
                                {formatDay(new Date(timestamp * 1000))}
                            </div>
                        </div>
                    </div>  
                </div>
            </CardBody>
        </Card>
    )
}
