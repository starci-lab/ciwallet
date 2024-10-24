"use client"
import { useAppSelector } from "@/redux"
import React from "react"
import {
    Accordion,
    AccordionItem,
    Card,
    CardBody,
    Image,
    Spacer,
} from "@nextui-org/react"
import { NFTCollection } from "./NFTCollection"
import { valuesWithKey } from "@/utils"

export const NFTs = () => {
    const preferenceChainKey = useAppSelector(
        (state) => state.blockchainReducer.preferenceChainKey
    )

    const nftGroups = useAppSelector(
        (state) => state.blockchainReducer.chains[preferenceChainKey].nftGroups
    )
    const groupKeys = Object.keys(nftGroups)
    const network = useAppSelector((state) => state.blockchainReducer.network)
    return (
        <div>
            {groupKeys.map((groupKey) => {
                const nftGroup = nftGroups[groupKey]
                const collections = nftGroup.collections
                return (
                    <Card key={groupKey}>
                        <CardBody className="p-3">
                            <div className="flex gap-2 items-center">
                                <Image
                                    removeWrapper
                                    className="w-7 h-7"
                                    src={nftGroup.imageUrl}
                                />
                                <div className="font-bold text-xl">{nftGroup.name}</div>
                            </div>
                            <Spacer y={4} />
                            <Accordion
                                itemClasses={{
                                    title: "text-base",
                                }}
                            >
                                {valuesWithKey(collections).map((collection) => {
                                    return (
                                        <AccordionItem
                                            startContent={
                                                <Image
                                                    className="w-6"
                                                    removeWrapper
                                                    src={collection[network].imageUrl}
                                                />
                                            }
                                            key={collection.key}
                                            aria-label={collection.key}
                                            title={collection[network].name}
                                        >
                                            <NFTCollection nftCollection={collection[network]} key={collection.key}/>
                                        </AccordionItem>
                                    )
                                })}
                            </Accordion>
                        </CardBody>
                    </Card>
                )
            })}
        </div>
    )
}
