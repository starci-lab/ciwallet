"use client"
import { defaultChainKey } from "@/config"
import {
    useBridgeTransferFormik,
    useBridgeSelectRecipientModalDisclosure,
    useBridgeSelectTokenModalDisclosure,
    useBridgeTransferResultModalDiscloresure,
    useBalance,
    useErrorModalDisclosure,
} from "@/hooks"
import {
    Input,
    Spacer,
    Image,
    Button,
    Select,
    SelectItem,
} from "@nextui-org/react"
import { useAppSelector } from "@/redux"
import React from "react"
import {
    createAccount,
} from "@/services"
import { truncateString } from "@/utils"

export const TransferTab = () => {
    const formik = useBridgeTransferFormik()
    const { onOpen } = useBridgeSelectTokenModalDisclosure()
    const { onOpen: onBridgeSelectRecipientModalDisclosureOpen } =
    useBridgeSelectRecipientModalDisclosure()

    const { onOpen: onBridgeTransferResultModalDiscloresureOpen } =
    useBridgeTransferResultModalDiscloresure()

    const { onOpen: onErrorModalDisclosureOpen } = useErrorModalDisclosure()

    const preferenceChainKey = useAppSelector(
        (state) => state.blockchainReducer.preferenceChainKey
    )

    const chains = useAppSelector((state) => state.blockchainReducer.chains)

    const tokens = chains[preferenceChainKey].tokens
    const token = tokens[formik.values.tokenKey]

    const { imageUrl, name, symbol } = { ...token }

    const mnemonic = useAppSelector((state) => state.authReducer.mnemonic)

    const { address } = createAccount({
        accountNumber: formik.values.targetAccountNumber,
        mnemonic,
        chainKey: formik.values.targetChainKey,
    })

    const { balanceSwr } = useBalance({
        chainKey: preferenceChainKey,
        tokenKey: formik.values.tokenKey,
        accountAddress: address,
    })

    const { data } = { ...balanceSwr }
   
    return (
        <form
            className="h-full"
            onSubmit={formik.handleSubmit}
            onReset={formik.handleReset}
        >
            <div className="w-full min-h-full flex flex-col gap-6 justify-between">
                <div>
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
                    </div>
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
                        description={`Balance: ${data} ${symbol}`}
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
                                src={chains[formik.values.targetChainKey]?.imageUrl}
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
                        {Object.values(chains)
                            .filter(({ key }) => key !== preferenceChainKey)
                            .map(({ key, name, imageUrl }) => (
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
                            {address ? truncateString(address) : ""}
                        </Button>
                    </div>
                </div>
                <Button
                    color="primary"
                    type="submit"
                    isLoading={formik.isSubmitting}
                    onPress={async () => {
                        try {
                            await formik.submitForm()
                            onBridgeTransferResultModalDiscloresureOpen()
                        } catch (ex) {
                            console.error(ex)
                            onErrorModalDisclosureOpen()
                        }
                    }}
                >
          Transfer
                </Button>
            </div>
        </form>
    )
}
