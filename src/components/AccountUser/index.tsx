"use client"

import { StoredAccount, setActiveAccountNumber, useAppDispatch, useAppSelector } from "@/redux"
import { createAccount } from "@/services"
import { truncateString } from "@/utils"
import { Card, CardBody, User, CheckboxIcon } from "@nextui-org/react"
import React from "react"

interface AccountUserProps {
    account: StoredAccount
    accountNumber: number
    activeAccountNumber: number
}

export const AccountUser = ({account: { imageUrl, name }, activeAccountNumber, accountNumber}: AccountUserProps) => {
    const mnemonic = useAppSelector(state => state.authReducer.mnemonic)
    const preferenceChainKey = useAppSelector(state => state.blockchainReducer.preferenceChainKey)
    const algorandMnemonics = useAppSelector(state => state.authReducer.algorandMnemonics)
    const _mnemonic = preferenceChainKey === "algorand" ? algorandMnemonics[activeAccountNumber] : mnemonic
    const dispatch = useAppDispatch()

    const { address } = createAccount({
        accountNumber,
        mnemonic: _mnemonic,
        chainKey: preferenceChainKey
    })

    return (
        <Card classNames={{
            base: "!bg-transparent"
        }} disableRipple isPressable onPress={() => dispatch(setActiveAccountNumber({
            accountNumber,
            preferenceChainKey
        }))} fullWidth shadow="none">
            <CardBody className="px-3 py-2">
                <div className="flex justify-between items-center w-full">
                    <User
                        avatarProps={{
                            src: imageUrl
                        }}
                        name={
                            <div className="flex gap-1 text-sm items-center">
                                <div>{name}</div>
                                <div className="text-primary">{`[${accountNumber}]`}</div>
                            </div>
                        }
                        description={
                            truncateString(address)
                        }/>
                    <CheckboxIcon isSelected={activeAccountNumber === accountNumber} className="w-3"/>
                </div>   
            </CardBody>
        </Card>
    )
}