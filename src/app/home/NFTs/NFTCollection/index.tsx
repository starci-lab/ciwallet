"use client"
import { NftInfo } from "@/config"
import { useNFTs } from "@/hooks"
import { useAppSelector } from "@/redux"
import { truncateString } from "@/utils"
import { Card, CardBody, CardFooter, Image, Link } from "@nextui-org/react"
import React from "react"

export interface NFTCollectionProps {
  nft: NftInfo;
}

export const NFTCollection = ({ nft }: NFTCollectionProps) => {
    const preferenceChainKey = useAppSelector(
        (state) => state.blockchainReducer.preferenceChainKey
    )
    const network = useAppSelector((state) => state.blockchainReducer.network)
    const credentials = useAppSelector((state) => state.authReducer.credentials)
    
    const { nftsSwr } = useNFTs({
        accountAddress: credentials[preferenceChainKey].address,
        chainKey: preferenceChainKey,
        nftAddress: nft.addresses[network],
        skip: 0,
        take: 5,
    })
    return (
        <div>
            <div className="grid gap-2 grid-cols-2 sm:grid-cols-4">
                {nftsSwr.data?.records.map((record) => (
                    <Card key={record.tokenId}>
                        <CardBody className="p-3">
                            <div className="aspect-square grid place-items-center">
                                <Image removeWrapper src={nft.imageUrl}/>
                            </div>
                        </CardBody>
                        <CardFooter className="py-3 pb-3 pt-0">
                            <div className="flex items-center justify-between w-full">
                                <div className="font-bold text-sm">#{truncateString(record.tokenId, 3, 0) }</div>
                                <Link isExternal showAnchorIcon href={record.tokenURI} size="sm">URI</Link>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
