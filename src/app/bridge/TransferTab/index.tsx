"use client"
import { crosschainConfig, defaultChainKey, nativeTokenKey } from "@/config"
import {
    useBridgeTransferFormik,
    useBridgeSelectRecipientModalDisclosure,
    useBridgeSelectTokenModalDisclosure,
    useBalance,
    useConfirmModalDisclosure,
    useBridgeTransferResultModalDiscloresure,
    useErrorModalDisclosure,
} from "@/hooks"
import {
    Input,
    Spacer,
    Image,
    Button,
    Select,
    SelectItem,
    Link,
} from "@nextui-org/react"
import {
    setConfirm,
    TransactionType,
    useAppDispatch,
    useAppSelector,
} from "@/redux"
import React, { useEffect } from "react"
import { createAccount, explorerUrl } from "@/services"
import { replace, truncateString, valuesWithKey } from "@/utils"
import { v4 } from "uuid"

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
    useEffect(() => {
        if (!data) return
        formik.setFieldValue("balance", data)
    }, [data])

    const protocols =
    crosschainConfig()[preferenceChainKey][formik.values.targetChainKey]

    const defaultBridgeProtocol = valuesWithKey(protocols)[0]

    useEffect(() => {
        if (formik.values.tokenKey === nativeTokenKey) {
            formik.setFieldValue(
                "nativeAmountPlusFee",
                Number(formik.values.amount) + defaultBridgeProtocol.minimalFee
            )
        } else {
            formik.setFieldValue(
                "nativeAmountPlusFee",
                defaultBridgeProtocol.minimalFee
            )
        }
    }, [formik.values.tokenKey, formik.values.amount])

    const { onOpen: onConfirmModalDisclosureOpen } = useConfirmModalDisclosure()

    const dispatch = useAppDispatch()
    const network = useAppSelector((state) => state.blockchainReducer.network)

    return (
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
                    label={`Amount (Max: ${data} ${symbol})`}
                    placeholder="Input transfer amount here"
                    labelPlacement="outside"
                    required
                    value={formik.values.amount.toString()}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={!!(formik.touched.amount && formik.errors.amount)}
                    errorMessage={formik.touched.amount && formik.errors.amount}
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
                    {valuesWithKey(chains)
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
                <Select
                    startContent={
                        <Image
                            removeWrapper
                            className="w-5 h-5"
                            src={protocols[formik.values.bridgeProtocolKey]?.imageUrl}
                        />
                    }
                    label="Select Bridge Protocol"
                    labelPlacement="outside"
                    selectedKeys={[formik.values.bridgeProtocolKey]}
                    onSelectionChange={(keys) => {
                        const currentKey = keys.currentKey
                        if (!currentKey) return
                        const bridgeProtocolKey = currentKey ?? defaultBridgeProtocol.key
                        formik.setFieldValue("bridgeProtocolKey", bridgeProtocolKey)
                    }}
                >
                    {valuesWithKey(protocols).map(({ key, name, imageUrl }) => (
                        <SelectItem
                            startContent={<Image className="w-5 h-5" src={imageUrl} />}
                            key={key}
                            value={key}
                        >
                            {name}
                        </SelectItem>
                    ))}
                </Select>
                <Spacer y={1.5} />
                <div className="text-xs text-warning text-justify">
                    {protocols[formik.values.bridgeProtocolKey].warningMsg}
                </div>
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
            <div>
                <Button
                    isDisabled={!formik.isValid}
                    color="primary"
                    fullWidth
                    onPress={async () => {
                        dispatch(
                            setConfirm({
                                type: TransactionType.BridgeTransfer,
                                confirmMessage: (
                                    <div className="grid gap-2">
                                        <div className="flex gap-2 items-center">
                                            <div className="w-[80px]">Transfer</div>
                                            <div className="flex gap-1 items-center">
                                                <div>{formik.values.amount}</div>
                                                <Image removeWrapper className="w-5 h-5" src={imageUrl} />
                                                <div className="text-sm">{symbol}</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <div className="w-[80px]">Path</div>
                                            <div className="flex gap-1 items-center">
                                                <Image
                                                    removeWrapper
                                                    className="w-5 h-5"
                                                    src={chains[preferenceChainKey].imageUrl}
                                                />
                                                <div className="text-sm">
                                                    {chains[preferenceChainKey].name}
                                                </div>
                                            </div>
                                            <div className="flex gap-2">to</div>
                                            <div className="flex gap-1 items-center">
                                                <Image
                                                    removeWrapper
                                                    className="w-5 h-5"
                                                    src={chains[formik.values.targetChainKey].imageUrl}
                                                />
                                                <div className="text-sm">
                                                    {chains[formik.values.targetChainKey].name}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <div className="w-[80px]">Protocol</div>
                                            <div className="flex gap-1 items-center">
                                                <Image
                                                    removeWrapper
                                                    className="w-5 h-5"
                                                    src={protocols[formik.values.bridgeProtocolKey].imageUrl}
                                                />
                                                <div className="text-sm">
                                                    {protocols[formik.values.bridgeProtocolKey].name}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <div className="w-[80px]">Recipient</div>
                                            <Link
                                                showAnchorIcon
                                                isExternal
                                                href={explorerUrl({
                                                    chainKey: preferenceChainKey,
                                                    value: address,
                                                    network,
                                                    type: "address",
                                                })}
                                                color="primary"
                                                size="sm"
                                            >
                                                {truncateString(address)}
                                            </Link>
                                        </div>
                                    </div>
                                ),
                                processFn: async () => {
                                    try {
                                        await formik.submitForm()
                                        onBridgeTransferResultModalDiscloresureOpen()
                                    } catch (ex) {
                                        console.error(ex)
                                        onErrorModalDisclosureOpen()
                                    }
                                },
                                id: v4(),
                            })
                        )
                        onConfirmModalDisclosureOpen()
                    }}
                >
          Transfer
                </Button>
                {formik.errors.nativeAmountPlusFee ? (
                    <>
                        <Spacer y={1.5} />
                        <div className="text-xs text-danger">
                            {replace(
                                replace(
                                    formik.errors.nativeAmountPlusFee ?? "",
                                    "AMOUNT",
                                    formik.values.amount.toString()
                                ),
                                "SYMBOL",
                                symbol
                            )}
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    )
}
