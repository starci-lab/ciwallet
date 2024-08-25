"use client"
import { chainConfig } from "@/config"
import { useBridgeSelectVaaModalDisclosure } from "@/hooks"
import { useAppSelector } from "@/redux"
import { formatDay, truncateString } from "@/utils"
import { Card, CardBody, Spacer, Image } from "@nextui-org/react"
import React from "react"

export const VAAProfile = () => {
    const { onOpen } = useBridgeSelectVaaModalDisclosure()

    const { selectedKey, storedVaas } = useAppSelector(state => state.vaaReducer)
    const vaa = storedVaas.find(({ key }) => key === selectedKey)
    const {
        tokenKey,
        fromAddress,
        fromChainKey,
        amount,
        serializedVaa,
        targetChainKey,
        targetAddress,
        createdAt
    } = vaa!

    const tokens = useAppSelector(state => state.tokenReducer.tokens[fromChainKey].tokens)
    const token = { ...tokens.find(({ key }) => key === tokenKey) }

    const chains = [...chainConfig().chains]

    const fromChain = chains.find((chain) => chain.key === fromChainKey)
    const targetChain = chains.find((chain) => chain.key === targetChainKey)

    return (
        <Card onPress={onOpen} fullWidth isPressable disableRipple>
            <CardBody className="px-3 py-2">
                <div className="w-full">
                    <div className="font-semibold">
                        {truncateString(serializedVaa, 20, 0)}
                    </div>
                    <Spacer y={4} />
                    <div className="grid gap-2">
                        <div className="flex gap-1 items-center">
                            <div className="text-sm min-w-[100px] text-foreground-400">
                      Transfer
                            </div>
                            <div className="flex gap-1 items-center">
                                <Image
                                    removeWrapper
                                    src={token?.imageUrl}
                                    className="w-5 h-5"
                                />
                                <div className="text-sm">
                                    {amount} {token?.symbol}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-1 items-center">
                            <div className="text-sm min-w-[100px] text-foreground-400">
                      From
                            </div>
                            <div className="flex gap-1 items-center">
                                <Image
                                    removeWrapper
                                    src={fromChain?.imageUrl}
                                    className="w-5 h-5"
                                />
                                <div className="text-sm">
                                    {truncateString(fromAddress)}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-1 items-center">
                            <div className="text-sm min-w-[100px] text-foreground-400">
                      To
                            </div>
                            <div className="flex gap-1 items-center">
                                <Image
                                    removeWrapper
                                    src={targetChain?.imageUrl}
                                    className="w-5 h-5"
                                />
                                <div className="text-sm">
                                    {truncateString(targetAddress)}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-1 items-center">
                            <div className="text-sm min-w-[100px] text-foreground-400">
                      Created At
                            </div>
                            <div className="flex gap-1 items-center">
                                {formatDay(createdAt)}
                            </div>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )

}