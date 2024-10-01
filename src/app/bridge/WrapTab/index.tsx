"use client"
import { useBridgeWrapFormik, useBridgeWrapSelectTokenModalDisclosure } from "@/hooks"
import { useAppSelector } from "@/redux"
import { Image, Button, Spacer } from "@nextui-org/react"
import React from "react"

export const WrapTab = () => {
    const formik = useBridgeWrapFormik()
    const { onOpen } = useBridgeWrapSelectTokenModalDisclosure()
    const preferenceChainKey = useAppSelector(
        (state) => state.blockchainReducer.preferenceChainKey
    )
    const chains = useAppSelector((state) => state.blockchainReducer.chains)
    const tokens = chains[preferenceChainKey].tokens
    const token = tokens[formik.values.tokenKey]
    const { imageUrl, name, symbol } = { ...token }

    return <form
        className="h-full"
        onSubmit={formik.handleSubmit}
        onReset={formik.handleReset}
    >
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
                <Spacer y={4} />
            </div> 
        </div>
    </form>
}
