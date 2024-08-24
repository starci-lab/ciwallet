"use client"
import { chainConfig, defaultChainKey } from "@/config"
import {
    useBridgeTransferFormik,
    useBridgeSelectRecipientModalDisclosure,
    useBridgeSelectTokenModalDisclosure,
    useBridgeTransferResultModalDiscloresure,
} from "@/hooks"
import {
    Input,
    Spacer,
    Image,
    Button,
    Select,
    SelectItem,
} from "@nextui-org/react"
import { ChainBalance, useAppSelector } from "@/redux"
import React from "react"
import { createAptosAccount, createSolanaAccount } from "@/services"
import { truncateString } from "@/utils"
import { AccountAddress } from "@aptos-labs/ts-sdk"
import { PublicKey } from "@solana/web3.js"

export const TransferTab = () => {
    const formik = useBridgeTransferFormik()
    const { onOpen } = useBridgeSelectTokenModalDisclosure()
    const { onOpen: onBridgeSelectRecipientModalDisclosureOpen } =
    useBridgeSelectRecipientModalDisclosure()

    const { onOpen: onBridgeTransferResultModalDiscloresureOpen } =
    useBridgeTransferResultModalDiscloresure()

    const preferenceChainKey = useAppSelector(
        (state) => state.chainReducer.preferenceChainKey
    )

    const aptosBalance = useAppSelector(
        (state) => state.chainReducer.aptos.balance
    )
    const solanaBalance = useAppSelector(
        (state) => state.chainReducer.solana.balance
    )

    const balanceMap: Record<string, ChainBalance> = {
        aptos: aptosBalance,
        solana: solanaBalance,
    }
    const { amount: nativeAmount } = {
        ...balanceMap[
            chainConfig().chains.find(
                ({ chain }) => formik.values.tokenId.chain === chain
            )?.key ?? ""
        ],
    }

    const chains = [
        ...chainConfig().chains.filter(({ key }) => key !== preferenceChainKey),
    ]

    const tokens = [...chainConfig().tokens]

    const { imageUrl, name, symbol } = {
        ...tokens.find(
            ({ tokenId }) =>
                tokenId.chain === formik.values.tokenId.chain &&
        tokenId.address === formik.values.tokenId.address
        ),
    }

    const mnemonic = useAppSelector((state) => state.authReducer.mnemonic)

    const default1: { accountAddress?: AccountAddress } = {}
    const { accountAddress } = mnemonic
        ? createAptosAccount({
            accountNumber: formik.values.targetAccountNumber,
            mnemonic,
        })
        : default1

    const default2: { publicKey?: PublicKey } = {}
    const { publicKey } = mnemonic
        ? createSolanaAccount({
            accountNumber: formik.values.targetAccountNumber,
            mnemonic,
        })
        : default2

    const map: Record<string, string> = {
        aptos: accountAddress?.toString() ?? "",
        solana: publicKey?.toString() ?? "",
    }

    const address = map[formik.values.targetChainKey]

    const isNative = formik.values.tokenId.address === "native"

    return (
        <form
            className="h-full"
            onSubmit={formik.handleSubmit}
            onReset={formik.handleReset}
        >
            <div className="w-full h-full flex flex-col justify-between">
                <div>
                    <div>
                        <div className="text-sm">Select Token</div>
                        <Spacer y={1.5} />
                    </div>
                    <Button className="px-3 bg-content2" onPress={onOpen} fullWidth>
                        <div className="flex gap-2 items-center w-full">
                            <div className="flex gap-2 items-center">
                                <Image className="w-5 h-5" src={imageUrl} />
                                <div className="flex gap-1 items-center">
                                    <div>{name}</div>
                                    <div className="text-foreground-400">{symbol}</div>
                                </div>
                            </div>
                        </div>
                    </Button>
                    <Spacer y={4} />
                    <Input
                        id="amount"
                        label="Amount"
                        placeholder="Input transfer amount here"
                        labelPlacement="outside"
                        required
                        value={formik.values.amount.toString()}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={!!(formik.touched.amount && formik.errors.amount)}
                        errorMessage={formik.touched.amount && formik.errors.amount}
                        description={`Balance: ${isNative ? nativeAmount : 0} ${symbol}`}
                        endContent={
                            <div className="text-sm text-foreground-400">{symbol}</div>
                        }
                    />
                    <Spacer y={4} />
                    <Select
                        startContent={
                            <Image
                                removeWrapper
                                className="w-5 h-5"
                                src={
                                    chainConfig().chains.find(
                                        ({ key }) => key === formik.values.targetChainKey
                                    )?.imageUrl
                                }
                            />
                        }
                        label="Select Target Chain"
                        labelPlacement="outside"
                        selectedKeys={[formik.values.targetChainKey]}
                        onSelectionChange={(keys) => {
                            const currentKey = keys.currentKey
                            if (!currentKey) return
                            const selectedChainKey = currentKey ?? defaultChainKey
                            formik.setFieldValue("targetChainKey", selectedChainKey)
                        }}
                    >
                        {chains.map(({ key, name, imageUrl }) => (
                            <SelectItem
                                startContent={<Image className="w-5 h-5" src={imageUrl} />}
                                key={key}
                                value={key}
                            >
                                {name}
                            </SelectItem>
                        ))}
                    </Select>
                    <Spacer y={4} />
                    <div>
                        <div className="text-sm">Select Recipient</div>
                        <Spacer y={1.5} />
                        <Button
                            className="px-3 bg-content2 justify-start"
                            fullWidth
                            onPress={onBridgeSelectRecipientModalDisclosureOpen}
                        >
                            {truncateString(address)}
                        </Button>
                    </div>
                </div>
                <Button
                    color="primary"
                    type="submit"
                    isLoading={formik.isSubmitting}
                    onPress={async () => {
                        await formik.submitForm()
                        onBridgeTransferResultModalDiscloresureOpen()
                    }}
                >
          Transfer
                </Button>
            </div>
        </form>
    )
}
