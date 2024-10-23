import { nativeTokenKey, Network, ParachainConfig } from "@/config"
import { useAppSelector } from "@/redux"
import { WithKey } from "@/utils"
import { Card, CardBody, Avatar, Image } from "@nextui-org/react"
import React from "react"

export interface ParachainProps {
    parachain: WithKey<Record<Network, ParachainConfig>>
}

export const Parachain = ({ parachain }: ParachainProps) => {
    const network = useAppSelector((state) => state.blockchainReducer.network)
    const preferenceChainKey = useAppSelector((state) => state.blockchainReducer.preferenceChainKey)
    const chains = useAppSelector((state) => state.blockchainReducer.chains)
    const token = chains[preferenceChainKey].tokens[nativeTokenKey][network]

    return (
        <Card key={parachain.key} shadow="none" fullWidth>
            <CardBody className="p-3 bg-content2">
                <div className="flex gap-2 items-center">
                    <div className="relative">
                        <Avatar
                            isBordered
                            src={parachain[network].imageUrl}
                            classNames={{
                                base: "absolute w-5 h-5 bottom-0 right-0 z-20 ring-0 bg-background",
                            }}
                        />
                        <Image
                            removeWrapper
                            src={token.imageUrl}
                            className="w-10 h-10"
                        />
                    </div>
                    <div>
                        <div>{`${token?.name} (${parachain[network].name})`}</div>
                        <div className="text-sm text-foreground-400">
                            0 {token?.symbol}
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}