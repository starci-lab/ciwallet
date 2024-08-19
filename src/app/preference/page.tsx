"use client"
import React from "react"
import { Container } from "@/components"
import { Button, Image, Select, SelectItem, Spacer } from "@nextui-org/react"
import { chainConfig, constantConfig, defaultChainKey } from "@/config"
import { setPreferenceChain, useAppDispatch, useAppSelector } from "@/redux"
import { useRouter } from "next/navigation"

const Page = () => {
    const dispatch = useAppDispatch()
    const preferenceChain = useAppSelector(
        (state) => state.chainReducer.preferenceChain
    )
    const router = useRouter()

    return (
        <Container centerContent hasPadding>
            <div>
                <div className="text-2xl font-bold">Select your preference chain</div>
                <Spacer y={12} />
                <Select
                    size="lg"
                    startContent={<Image className="w-6 h-6" src={chainConfig().chains.find(({ key }) => key === preferenceChain)?.imageUrl} />}
                    aria-label="Select your preference chain"
                    selectedKeys={[preferenceChain]}
                    onSelectionChange={(keys) => {
                        const selectedChain = keys.currentKey
                        dispatch(setPreferenceChain(selectedChain ?? defaultChainKey))
                    }}
                >
                    {chainConfig().chains.map(({ key, chain, imageUrl }) => (
                        <SelectItem
                            startContent={<Image className="w-5 h-5" src={imageUrl} />}
                            key={key}
                            value={key}
                        >
                            {chain}
                        </SelectItem>
                    ))}
                </Select>
                <Spacer y={12} />
                <Button onPress={() => router.push(constantConfig().path.home)} color="primary" fullWidth>
          Continue
                </Button>
            </div>
        </Container>
    )
}

export default Page
