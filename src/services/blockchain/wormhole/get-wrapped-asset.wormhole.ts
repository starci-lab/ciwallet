import { TokenAddress, toNative } from "@wormhole-foundation/sdk-definitions"
import { getWormhole } from "./base.wormhole"
import { Chain, Network } from "@wormhole-foundation/sdk-base"

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
    const foreignChain = wormhole.getChain(foreignChainName)
    const foreignTokenBridge = await foreignChain.getTokenBridge()

    return foreignTokenBridge.getWrappedAsset({
        address: toNative(sourceChainName, sourceTokenAddress),
        chain: sourceChainName,
    })
}
