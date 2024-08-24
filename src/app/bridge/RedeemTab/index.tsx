"use client"
import { chainConfig } from "@/config"
import {
    useBridgeRedeemFormik,
    useBridgeRedeemResultModalDiscloresure,
    useBridgeSelectVaaModalDisclosure,
} from "@/hooks"
import { useAppSelector } from "@/redux"
import { truncateString } from "@/utils"
import { Card, CardBody, Spacer, Image, Button } from "@nextui-org/react"
import React from "react"

export const RedeemTab = () => {
    const { onOpen } = useBridgeSelectVaaModalDisclosure()

    const { selectedVaaIndex, storedVaas } = useAppSelector(
        (state) => state.vaaReducer
    )
    const {
        tokenId,
        fromAddress,
        fromChainKey,
        amount,
        serializedVaa,
        targetChainKey,
        targetAddress,
    } = storedVaas[selectedVaaIndex]

    const tokens = [...chainConfig().tokens]

    const token = tokens.find(
        (token) =>
            token.tokenId.address === tokenId.address &&
      token.tokenId.chain === tokenId.chain
    )

    const chains = [...chainConfig().chains]

    const fromChain = chains.find((chain) => chain.key === fromChainKey)
    const targetChain = chains.find((chain) => chain.key === targetChainKey)

    const formik = useBridgeRedeemFormik()

    const { onOpen: onBridgeRedeemResultModalOpen } =
    useBridgeRedeemResultModalDiscloresure()
    return (
        <form
            className="h-full"
            onSubmit={formik.handleSubmit}
            onReset={formik.handleReset}
        >
            <div className="w-full h-full flex flex-col justify-between">
                <div>
                    <Card onPress={onOpen} fullWidth isPressable disableRipple>
                        <CardBody className="px-3 py-2">
                            <div className="w-full">
                                <div className="font-semibold">
                                    {truncateString(serializedVaa, 20, 0)}
                                </div>
                                <Spacer y={4} />
                                <div className="grid gap-2">
                                    <div className="flex gap-1 items-center">
                                        <div className="text-sm min-w-[100px] text-foreground-400">
                      Transfer
                                        </div>
                                        <div className="flex gap-1 items-center">
                                            <Image
                                                removeWrapper
                                                src={token?.imageUrl}
                                                className="w-5 h-5"
                                            />
                                            <div className="text-sm">
                                                {amount} {token?.symbol}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-1 items-center">
                                        <div className="text-sm min-w-[100px] text-foreground-400">
                      From
                                        </div>
                                        <div className="flex gap-1 items-center">
                                            <Image
                                                removeWrapper
                                                src={fromChain?.imageUrl}
                                                className="w-5 h-5"
                                            />
                                            <div className="text-sm">
                                                {truncateString(fromAddress)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-1 items-center">
                                        <div className="text-sm min-w-[100px] text-foreground-400">
                      To
                                        </div>
                                        <div className="flex gap-1 items-center">
                                            <Image
                                                removeWrapper
                                                src={targetChain?.imageUrl}
                                                className="w-5 h-5"
                                            />
                                            <div className="text-sm">
                                                {truncateString(targetAddress)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <Button
                    color="primary"
                    isLoading={formik.isSubmitting}
                    onPress={async () => {
                        await formik.submitForm()
                        onBridgeRedeemResultModalOpen()
                    }}
                    fullWidth
                >
                    {" "}
          Redeem{" "}
                </Button>
            </div>
        </form>
    )
}
