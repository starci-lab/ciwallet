"use client"
import React from "react"
import { Container } from "@/components"
import { Button, Image, Select, SelectItem, Spacer } from "@nextui-org/react"
import { chainConfig, chainInfos, constantConfig, defaultChainKey } from "@/config"
import { setPreferenceChainKey, useAppDispatch, useAppSelector } from "@/redux"
import { useRouter } from "next/navigation"

const Page = () => {
    const dispatch = useAppDispatch()
    const preferenceChainKey = useAppSelector(
        (state) => state.chainReducer.preferenceChainKey
    )
    const router = useRouter()

    return (
        <Container centerContent hasPadding>
            <div>
                <div className="text-2xl font-bold">Select your preference chain</div>
                <Spacer y={12} />
                <Select
                    size="lg"
                    startContent={
                        <Image
                            className="w-6 h-6"
                            src={
                                chainConfig().chains[preferenceChainKey]
                                    ?.imageUrl
                            }
                        />
                    }
                    aria-label="Select your preference chain"
                    selectedKeys={[preferenceChainKey]}
                    onSelectionChange={(keys) => {
                        const selectedChain = keys.currentKey  ?? defaultChainKey
                        dispatch(setPreferenceChainKey(selectedChain))
                    }}
                >
                    {chainInfos.map(({ key, name, imageUrl }) => (
                        <SelectItem
                            startContent={<Image className="w-5 h-5" src={imageUrl} />}
                            key={key}
                            value={key}
                        >
                            {name}
                        </SelectItem>
                    ))}
                </Select>
                <Spacer y={12} />
                <Button
                    onPress={() => {
                        router.push(constantConfig().path.createPassword)
                    }}
                    color="primary"
                    fullWidth
                >
          Continue
                </Button>
            </div>
        </Container>
    )
}

export default Page
