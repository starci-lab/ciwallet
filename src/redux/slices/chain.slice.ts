import { ChainInfo, TokenInfo, chainConfig, defaultChainKey } from "@/config"
import { ChainAccount, Network } from "@/services"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { v4 } from "uuid"

export interface ChainState {
  network: Network;
  preferenceChainKey: string;
  credentials: ChainCredentials
  chains: Record<string, ChainInfo>;
  saveChainsKey: number;
}

export interface ChainCredential {
  address: string;
  privateKey: string;
  publicKey: string;
}

export type ChainCredentials = Record<string, ChainCredential>;


const initialState: ChainState = {
    preferenceChainKey: defaultChainKey,
    network: Network.Testnet,
    credentials: {
        aptos: {
            address: "",
            privateKey: "",
            publicKey: "",
        },
        solana: {
            address: "",
            privateKey: "",
            publicKey: "",
        },
        bsc: {
            address: "",
            privateKey: "",
            publicKey: "",
        }
    },
    chains: chainConfig().chains,
    saveChainsKey: 0,
}

export interface SetCredentialParams {
    account: Partial<ChainAccount>,
    chainKey: string
}

export interface AddTokenParams {
    chainKey: string;
    tokenInfo: Omit<TokenInfo, "key">;
}  

export const chainSlice = createSlice({
    name: "chainReducer",
    initialState,
    reducers: {
        setPreferenceChainKey: (state, { payload }: PayloadAction<string>) => {
            state.preferenceChainKey = payload
        },
        setCredential: (
            state,
            {
                payload: { account: {  address, privateKey, publicKey }, chainKey },
            }: PayloadAction<SetCredentialParams>
        ) => {
            if (address) {
                state.credentials[chainKey].address = address
            }
            if (privateKey) {
                state.credentials[chainKey].privateKey = privateKey
            }
            if (publicKey) {
                state.credentials[chainKey].publicKey = publicKey
            }
        },
        setChain: (
            state,
            { payload }: { payload: Record<string, ChainInfo> }
        ) => {
            state.chains = payload
        },
        triggerSaveChains: (state) => {
            state.saveChainsKey++
        },
        addToken: (
            state,
            { payload: { chainKey, tokenInfo } }: { payload: AddTokenParams }
        ) => {
            const tokenInfos = state.chains[chainKey].tokens
            tokenInfos.push({
                ...tokenInfo,
                key: v4(),
            })
        },
    },
})

export const {
    setPreferenceChainKey,
    setCredential,
    addToken,
    setChain,
    triggerSaveChains
} = chainSlice.actions
export const chainReducer = chainSlice.reducer
