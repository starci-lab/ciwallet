import {
    TokenAddress,
} from "@wormhole-foundation/sdk-definitions"
import { getWormhole } from "./base.wormhole"
import { Chain, Network } from "@wormhole-foundation/sdk-base"
import { UniversalAddress } from "@wormhole-foundation/sdk"
import { getUniversalAddress } from "./get-address.wormhole"

export interface GetWrappedAssetParams<
  N extends Network,
  SourceChainName extends Chain,
  ForeignChainName extends Chain
> {
  network: N;
  sourceTokenAddress: string;
  sourceChainName: SourceChainName;
  foreignChainName: ForeignChainName;
}

export const getWrappedAsset = async <
  N extends Network,
  SourceChainName extends Chain,
  ForeignChainName extends Chain
>({
    network,
    sourceTokenAddress,
    sourceChainName,
    foreignChainName,
}: GetWrappedAssetParams<N, SourceChainName, ForeignChainName>): Promise<
  TokenAddress<ForeignChainName>
> => {
    const wormhole = await getWormhole(network)
    const sourceChain = wormhole.getChain(sourceChainName)
    const sourceTokenBridge = await sourceChain.getTokenBridge()
    const foreignChain = wormhole.getChain(foreignChainName)
    const foreignTokenBridge = await foreignChain.getTokenBridge()
  
    let universalAddress: UniversalAddress
    
    if (sourceTokenAddress === "native") {
        const native = await sourceTokenBridge.getWrappedNative()
        universalAddress = native.toUniversalAddress()
    } else {
        universalAddress = getUniversalAddress(sourceChainName, sourceTokenAddress)
    }

    return await foreignTokenBridge.getWrappedAsset({
        address: universalAddress,
        chain: sourceChainName,
    })
}
