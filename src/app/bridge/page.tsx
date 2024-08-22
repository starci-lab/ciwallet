"use client"
import { Container } from "@/components"
import { chainConfig, defaultChainKey } from "@/config"
import { useBridgeFormik, useBridgeSelectTokenModalDisclosure } from "@/hooks"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import { Input, Link, Spacer, Image, Button, Select, SelectItem } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/redux"
import React from "react"

const Page = () => {
    const formik = useBridgeFormik()
    const router = useRouter()
    const { onOpen } = useBridgeSelectTokenModalDisclosure()

    const preferenceChainKey = useAppSelector(
        (state) => state.chainReducer.preferenceChainKey
    )

    const chains = [
        ...chainConfig().chains.filter(({ key }) => key !== preferenceChainKey),
    ]

    const tokens = [
        ...chainConfig().tokens
    ]

    const { imageUrl, name, symbol } = {
        ...tokens.find(
            ({ tokenId }) =>
                tokenId.chain === formik.values.tokenId.chain &&
        tokenId.address === formik.values.tokenId.address
        ),
    }
    return (
        <Container hasPadding>
            <div className="w-full h-full flex flex-col justify-between">
                <div>
                    <div className="flex gap-2 items-center">
                        <Link as="button" onPress={() => router.back()} color="foreground">
                            <ArrowLeftIcon className="w-6 h-6" />
                        </Link>
                        <div className="text-2xl font-bold">Bridge</div>
                    </div>
                    <Spacer y={4} />
                    <div className="text-xs text-foreground-400">
                        Transfer assets between chains
                    </div>
                    <Spacer y={12} />
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
                        endContent={<div className="text-sm text-foreground-400">{symbol}</div>}
                    />
                    <Spacer y={4} />
                    <Select
                        startContent={
                            <Image
                                removeWrapper
                                className="w-5 h-5"
                                src={
                                    chainConfig().chains.find(({ key }) => key === formik.values.targetChainKey)
                                        ?.imageUrl
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
                        <div className="text-sm">Select Token</div>
                        <Spacer y={1.5} />
                    </div>
                    <Button className="px-3 bg-content2" onPress={() => onOpen()} fullWidth>
                        <div className="flex gap-2 items-center w-full">
                            <div className="flex gap-2 items-center">
                                <Image className="w-5 h-5" src={imageUrl} />
                                {name}
                            </div>
                        </div>
                    </Button>
                </div>
                <Button color="primary">Transfer</Button>
            </div>
                
        </Container>
    )
}

export default Page
