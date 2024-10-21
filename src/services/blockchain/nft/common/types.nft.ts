import { Atomic } from "@/utils"

export interface NftData {
    ownerAddress: string,
    tokenId: string,
    tokenURI: string
}

//algorand
export interface AlgorandCollection {
    id: string,
    name: string,
}

export interface AlgorandMetadata {
    name: string;
    collection: AlgorandCollection
    description: string;
    //image, for better display on the marketplace
    image: string;
    image_integrity: string; 
    image_mimetype: string;
    //data, for the actual content of the NFT
    properties: Record<string, Atomic>
  }