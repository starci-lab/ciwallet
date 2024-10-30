import { Network } from "@/config"
import { connect, KeyPair, keyStores } from "near-api-js"
import { KeyStore } from "near-api-js/lib/key_stores"
import { KeyPairString } from "near-api-js/lib/utils"

export const NEAR_MAINNET_NODE_URL = "https://rpc.mainnet.near.org"
export const NEAR_TESTNET_NODE_URL = "https://rpc.testnet.near.org"
export const NEAR_MAINNET_WALLET_URL = "https://wallet.mainnet.near.org"
export const NEAR_TESTNET_WALLET_URL = "https://testnet.mynearwallet.com/"
export const NEAR_MAINNET_HELPER_URL = "https://helper.mainnet.near.org"
export const NEAR_TESTNET_HELPER_URL = "https://helper.testnet.near.org"
export const NEAR_MAINNET_EXPLORER_URL = "https://nearblocks.io"
export const NEAR_TESTNET_EXPLORER_URL = "https://testnet.nearblocks.io"

export interface NearRpc {
  nodeUrl: string;
  walletUrl: string;
  helperUrl: string;
  explorerUrl: string;
}

const nearRpcsMap: Record<Network, NearRpc> = {
    [Network.Mainnet]: {
        nodeUrl: NEAR_MAINNET_NODE_URL,
        walletUrl: NEAR_MAINNET_WALLET_URL,
        helperUrl: NEAR_MAINNET_HELPER_URL,
        explorerUrl: NEAR_MAINNET_EXPLORER_URL,
    },
    [Network.Testnet]: {
        nodeUrl: NEAR_TESTNET_NODE_URL,
        walletUrl: NEAR_TESTNET_WALLET_URL,
        helperUrl: NEAR_TESTNET_HELPER_URL,
        explorerUrl: NEAR_TESTNET_EXPLORER_URL,
    },
}

export const keyStoreFromPrivateKey = (
    network: Network,
    privateKey: string
) => {
    const keyStore = new keyStores.InMemoryKeyStore()
    const keyPair = KeyPair.fromString(privateKey as KeyPairString)
    keyStore.setKey(network, "ciwallet-account.testnet", keyPair)
}
export const nearClient = async (network: Network, keyStore?: KeyStore) =>
    await connect({
        networkId: network,
        keyStore,
        ...nearRpcsMap[network],
    })
