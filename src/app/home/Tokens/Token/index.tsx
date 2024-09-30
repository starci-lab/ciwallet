"use client"

import { TokenInfo, blockchainConfig } from "@/config"
import { useBalance } from "@/hooks"
import { useAppSelector } from "@/redux"
import { createAccount } from "@/services"
import React from "react"
import { Avatar, Card, CardBody, Image } from "@nextui-org/react"

export interface TokenProps {
  token: TokenInfo;
}

export const Token = ({ token }: TokenProps) => {
    const mnemonic = useAppSelector((state) => state.authReducer.mnemonic)
    const algorandMnemonics = useAppSelector(
        (state) => state.authReducer.algorandMnemonics
    )
    const preferenceChainKey = useAppSelector(
        (state) => state.blockchainReducer.preferenceChainKey
    )
    const activeAccountNumber = useAppSelector(
        (state) =>
            state.authReducer.accountNumbers[preferenceChainKey].activeAccountNumber
    )
    const network = useAppSelector((state) => state.blockchainReducer.network)

    //if-else, case algorand
    const _mnemonic =
    preferenceChainKey !== "algorand"
        ? mnemonic
        : algorandMnemonics[activeAccountNumber]

    const account = createAccount({
        accountNumber: activeAccountNumber,
        chainKey: preferenceChainKey,
        mnemonic: _mnemonic,
    })

    const { balanceSwr } = useBalance({
        accountAddress: account?.address,
        chainKey: preferenceChainKey,
        tokenKey: token.key,
    })

    const { data } = { ...balanceSwr }

    const chain = blockchainConfig().chains[preferenceChainKey]
    const isNative = token.addresses[network] === "native"

    return (
        <Card shadow="none" fullWidth>
            <CardBody className="p-3 bg-content2">
                <div className="flex gap-2 items-center">
                    <div className="relative">
                        {!isNative ? (
                            <Avatar
                                isBordered
                                src={chain?.imageUrl}
                                classNames={{
                                    base: "absolute w-5 h-5 bottom-0 right-0 z-20 ring-0 bg-background",
                                }}
                            />
                        ) : null}
                        <Image removeWrapper src={token?.imageUrl} className="w-10 h-10" />
                    </div>

                    <div>
                        <div>{token?.name}</div>
                        <div className="text-sm text-foreground-400">
                            {data || 0} {token?.symbol}
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}
