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

export const NFTs = () => {
    const preferenceChainKey = useAppSelector(
        (state) => state.blockchainReducer.preferenceChainKey
    )

    const nftGroups = useAppSelector(
        (state) => state.blockchainReducer.chains[preferenceChainKey].nftGroups
    )
    const groupKeys = Object.keys(nftGroups)
    return (
        <div>
            {groupKeys.map((groupKey) => {
                const nftGroup = nftGroups[groupKey]
                const nfts = nftGroup.nfts
                const keys = Object.keys(nfts)
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
                                {keys.map((key) => {
                                    return (
                                        <AccordionItem
                                            startContent={
                                                <Image
                                                    className="w-6"
                                                    removeWrapper
                                                    src={nfts[key].imageUrl}
                                                />
                                            }
                                            key={key}
                                            aria-label={key}
                                            title={nfts[key].name}
                                        >
                                            <NFTCollection nft={nfts[key]} key={key}/>
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
