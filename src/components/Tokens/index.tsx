"use client"
import { chainConfig } from "@/config"
import { ChainBalance, useAppSelector } from "@/redux"
import { Card, CardBody, Image } from "@nextui-org/react"
import React from "react"

export const Tokens = () => {
    const preferenceChainKey = useAppSelector(
        (state) => state.chainReducer.preferenceChainKey
    )
    const aptosBalance = useAppSelector(
        (state) => state.chainReducer.aptos.balance
    )
    const solanaBalance = useAppSelector(
        (state) => state.chainReducer.solana.balance
    )
    const nativeToken = chainConfig().tokens.find(
        (token) => token.chainKey === preferenceChainKey
    )

    const map: Record<string, ChainBalance> = {
        aptos: aptosBalance,
        solana: solanaBalance,
    }

    return (
        <div>
            <Card shadow="none" fullWidth>
                <CardBody className="p-3 bg-content2">
                    <div className="flex gap-2 items-center">
                        <Image
                            removeWrapper
                            src={nativeToken?.imageUrl}
                            className="w-10 h-10"
                        />
                        <div>
                            <div>{nativeToken?.name}</div>
                            <div className="text-sm text-foreground-400">
                                {map[preferenceChainKey].amount} {nativeToken?.symbol}
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}
