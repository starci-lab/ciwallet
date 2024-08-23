"use client"

import { StoredAccount, useAppSelector } from "@/redux"
import { createAptosAccount, createSolanaAccount } from "@/services"
import { formatAddress } from "@/utils"
import { Snippet, Card, CardBody, User, CheckboxIcon } from "@nextui-org/react"
import React from "react"
import useSWR from "swr"

interface AccountUserProps {
    account: StoredAccount
    activeAccountNumber: number
}

export const AccountUser = ({account: { imageUrl, name, number }, activeAccountNumber}: AccountUserProps) => {
    const mnemonic = useAppSelector(state => state.authReducer.mnemonic)
    const preferenceChainKey = useAppSelector(state => state.chainReducer.preferenceChainKey)

    const { accountAddress } = createAptosAccount({
        accountNumber: number,
        mnemonic
    })

    const { data } = useSWR("SOLANA_ACCOUNT", () => createSolanaAccount({
        accountNumber: number,
        mnemonic
    }))
    
    const map: Record<string, string> = {
        "aptos": accountAddress.toString(),
        "solana": data?.publicKey.toString() ?? ""
    }

    return (
        <div className="flex items-center justify-between">
            <div className="w-fit">
                <Snippet hideSymbol classNames={{
                    base: "p-0 bg-inhenrit",
                }} size="sm" className="flex" codeString={map[preferenceChainKey]}>
                    <Card classNames={{
                        base: "!bg-transparent"
                    }} disableRipple isPressable shadow="none">
                        <CardBody className="p-0">
                            <User
                                avatarProps={{
                                    src: imageUrl
                                }}
                                name={name}
                                description={
                                    formatAddress(map[preferenceChainKey])
                                }/>
                        </CardBody>
                    </Card>
                </Snippet> 
            </div>
            <CheckboxIcon isSelected={activeAccountNumber === number} className="w-3"/>
        </div>
    )
}