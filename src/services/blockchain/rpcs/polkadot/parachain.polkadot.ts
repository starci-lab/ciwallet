import { ApiPromise, WsProvider } from "@polkadot/api"

export const parachainClient = async (
    rpcUrl: string
) => {
    const wsProvider = new WsProvider(rpcUrl)
    return await ApiPromise.create({ provider: wsProvider })
}
