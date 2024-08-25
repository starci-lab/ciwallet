import { defaultChainKey } from "@/config"
import { ChainAccount, Network } from "@/services"
import { DeepPartial } from "@apollo/client/utilities"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface ChainState {
  network: Network;
  preferenceChainKey: string;
  credentials: ChainCredentials
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
    },
}

export interface SetCredentialParams {
    account: Partial<ChainAccount>,
    chainKey: string
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
    },
})

export const {
    setPreferenceChainKey,
    setCredential
} = chainSlice.actions
export const chainReducer = chainSlice.reducer
