"use client"
import { StoredVaa, selectVaa, useAppDispatch, useAppSelector } from "@/redux"
import { formatDay, truncateString } from "@/utils"
import { Card, CardBody, CheckboxIcon, Image, Spacer } from "@nextui-org/react"
import React from "react"

export interface VAAProfileProps {
  vaa: Omit<StoredVaa, "isUsed">;
  selectedKey: string;
}

export const VAAProfile = ({
    vaa: {
        amount,
        fromAddress,
        fromChainKey,
        serializedVaa,
        targetAddress,
        targetChainKey,
        tokenKey,
        key,
        createdAt
    },
    selectedKey
}: VAAProfileProps) => {

    const chains = useAppSelector(state => state.chainReducer.chains)
    const tokens = chains[fromChainKey].tokens
    const fromChain = chains[fromChainKey]
    const targetChain = chains[targetChainKey]
    const token = tokens.find(({ key }) => key === tokenKey)

    const dispatch = useAppDispatch()
    
    return (
        <Card
            onPress={() => {
                dispatch(selectVaa(selectedKey))
            }}
            shadow="none"
            fullWidth
            isPressable
            disableRipple
        >
            <CardBody className="px-3 py-2">
                <div className="w-full flex items-center justify-between">
                    <div>
                        <div className="font-semibold">{truncateString(serializedVaa, 20, 0)}</div>
                        <Spacer y={4}/>
                        <div className="grid gap-2">
                            <div className="flex gap-1 items-center">
                                <div className="text-sm min-w-[100px] text-foreground-400">Transfer</div>
                                <div className="flex gap-1 items-center">
                                    <Image removeWrapper src={token?.imageUrl} className="w-5 h-5" /> 
                                    <div className="text-sm">{amount} {token?.symbol}</div>
                                </div>
                            </div>
                            <div className="flex gap-1 items-center">
                                <div className="text-sm min-w-[100px] text-foreground-400">From</div>
                                <div className="flex gap-1 items-center">
                                    <Image removeWrapper src={fromChain?.imageUrl} className="w-5 h-5" /> 
                                    <div className="text-sm">{truncateString(fromAddress)}</div>
                                </div>
                            </div>
                            <div className="flex gap-1 items-center">
                                <div className="text-sm min-w-[100px] text-foreground-400">To</div>
                                <div className="flex gap-1 items-center">
                                    <Image removeWrapper src={targetChain?.imageUrl} className="w-5 h-5" /> 
                                    <div className="text-sm">{truncateString(targetAddress)}</div>
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
                    <CheckboxIcon
                        isSelected={selectedKey === key}
                        className="w-3"
                    />
                </div>
            </CardBody>
        </Card>
    )
}
