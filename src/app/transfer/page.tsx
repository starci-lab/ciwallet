"use client"
import { Container } from "@/components"
import { setConfirm, useAppDispatch, useAppSelector } from "@/redux"
import { ArrowLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { Link, Spacer, Image, Button, Input } from "@nextui-org/react"
import React from "react"
import {
    useBalance,
    useConfirmModalDisclosure,
    useTransferFormik,
    useTransferSelectTokenModalDisclosure,
} from "@/hooks"
import { truncateString } from "@/utils"
import { explorerUrl } from "@/services"
import { v4 } from "uuid"

const Page = () => {
    const router = useRouter()
    const formik = useTransferFormik()
    const { onOpen } = useTransferSelectTokenModalDisclosure()
    const { onOpen: onConfirmModalDisclosureOpen } = useConfirmModalDisclosure()
    const dispatch = useAppDispatch()

    const preferenceChainKey = useAppSelector(
        (state) => state.blockchainReducer.preferenceChainKey
    )
    const chains = useAppSelector((state) => state.blockchainReducer.chains)
    const network = useAppSelector((state) => state.blockchainReducer.network)
    const tokens = chains[preferenceChainKey].tokens
    const { name, imageUrl, symbol } = tokens[formik.values.tokenKey]

    const address = useAppSelector(
        (state) => state.authReducer.credentials[preferenceChainKey].address
    )
    const { balanceSwr } = useBalance({
        chainKey: preferenceChainKey,
        tokenKey: formik.values.tokenKey,
        accountAddress: address,
    })

    const { data } = { ...balanceSwr }
    return (
        <Container hasPadding>
            <div className="flex flex-col gap-6 h-full">
                <div>
                    <div className="flex gap-2 items-center">
                        <Link
                            as="button"
                            onPress={() => router.back()}
                            color="foreground"
                        >
                            <ArrowLeftIcon className="w-6 h-6" />
                        </Link>
                        <div className="text-2xl font-bold">Transfer</div>
                    </div>
                    <Spacer y={4} />
                    <div className="text-xs text-foreground-400">
              Transfer assets to recipient
                    </div>
                </div>
                <div className="flex-1 flex flex-col">
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
                    <Input
                        id="recipientAddress"
                        label="Recipient"
                        placeholder="Input recipient address here"
                        labelPlacement="outside"
                        required
                        value={formik.values.recipientAddress.toString()}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={
                            !!(
                                formik.touched.recipientAddress &&
                  formik.errors.recipientAddress
                            )
                        }
                        errorMessage={
                            formik.touched.recipientAddress &&
                formik.errors.recipientAddress
                        }
                        startContent={
                            <Image
                                className="w-5 h-5"
                                src={tokens[formik.values.tokenKey].imageUrl}
                            />
                        }
                    />
                </div>
                <Button
                    color="primary"
                    onPress={async () => {
                        dispatch(
                            setConfirm({
                                confirmMessage: (
                                    <div className="flex gap-2 items-center">
                                        <div className="flex gap-2 items-center">
                                            <div className="">Transfer</div>
                                            <div className="flex gap-1 items-center">
                                                <div>{formik.values.amount}</div>
                                                <Image className="w-5 h-5" src={imageUrl} />
                                                <div className="text-sm">{symbol}</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div> to </div>
                                            <Link
                                                showAnchorIcon
                                                isExternal
                                                href={explorerUrl({
                                                    chainKey: preferenceChainKey,
                                                    value: formik.values.recipientAddress,
                                                    network,
                                                    type: "address",
                                                })}
                                                color="primary"
                                                size="sm"
                                            >
                                                {truncateString(
                                                    formik.values.recipientAddress
                                                )}
                                            </Link>
                                        </div>
                                    </div>
                                ),
                                processFn: async () => {
                                    await formik.submitForm()
                                },
                                id: v4(),
                            })
                        )
                        onConfirmModalDisclosureOpen()
                    }}
                >
            Transfer
                </Button>
            </div>
        </Container>
    )
}

export default Page
