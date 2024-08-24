"use client"
import { chainConfig } from "@/config"
import { StoredVaa } from "@/redux"
import { truncateString } from "@/utils"
import { Card, CardBody, CardProps, CheckboxIcon, Image, Spacer } from "@nextui-org/react"
import React from "react"

export interface VAAProfileProps extends CardProps {
  vaa: Omit<StoredVaa, "isUsed" | "key">;
  selectedVaaIndex: number;
  index: number;
  onPress: () => void;
}

export const VAAProfile = ({
    vaa: {
        amount,
        fromAddress,
        fromChainKey,
        serializedVaa,
        targetAddress,
        targetChainKey,
        tokenId,
    },
    index,
    selectedVaaIndex,
    onPress,
    ...props
}: VAAProfileProps) => {
    const tokens = [...chainConfig().tokens]

    const token = tokens.find(
        (token) =>
            token.tokenId.address === tokenId.address &&
      token.tokenId.chain === tokenId.chain
    )

    const chains = [...chainConfig().chains]

    const fromChain = chains.find((chain) => chain.key === fromChainKey)
    const targetChain = chains.find((chain) => chain.key === targetChainKey)

    return (
        <Card
            onPress={onPress}
            {...props}
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
                        </div>
                    </div>
                    <CheckboxIcon
                        isSelected={selectedVaaIndex === index}
                        className="w-3"
                    />
                </div>
            </CardBody>
        </Card>
    )
}
