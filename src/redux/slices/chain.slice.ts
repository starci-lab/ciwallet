import { defaultChainKey } from "@/config"
import { Network } from "@/services"
import { DeepPartial } from "@apollo/client/utilities"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface ChainState {
  network: Network;
  preferenceChainKey: string;
  aptos: ChainData;
  solana: ChainData;
}

export interface ChainCredential {
  address: string;
  privateKey: string;
  publicKey: string;
}

export interface ChainBalance {
  amount: number;
  refreshBalanceKey: number;
}

export interface ChainData {
  credential: ChainCredential;
  balance: ChainBalance;
}


const initialState: ChainState = {
    preferenceChainKey: defaultChainKey,
    network: Network.Testnet,
    aptos: {
        balance: {
            amount: 0,
            refreshBalanceKey: 0,
        },
        credential: {
            address: "",
            privateKey: "",
            publicKey: "",
        },
    },
    solana: {
        balance: {
            amount: 0,
            refreshBalanceKey: 0,
        },
        credential: {
            address: "",
            privateKey: "",
            publicKey: "",
        },
    },
}

export const chainSlice = createSlice({
    name: "chain",
    initialState,
    reducers: {
        setPreferenceChainKey: (state, { payload }: PayloadAction<string>) => {
            state.preferenceChainKey = payload
        },
        setAptosCredential: (
            state,
            {
                payload: { address, privateKey, publicKey },
            }: PayloadAction<DeepPartial<ChainCredential>>
        ) => {
            if (address) {
                state.aptos.credential.address = address
            }
            if (privateKey) {
                state.aptos.credential.privateKey = privateKey
            }
            if (publicKey) {
                state.aptos.credential.publicKey = publicKey
            }
        },
        setSolanaCredential: (
            state,
            {
                payload: { address, privateKey, publicKey },
            }: PayloadAction<DeepPartial<ChainCredential>>
        ) => {
            if (address) {
                state.solana.credential.address = address
            }
            if (privateKey) {
                state.solana.credential.privateKey = privateKey
            }
            if (publicKey) {
                state.solana.credential.publicKey = publicKey
            }
        },
        setAptosBalance: (
            state,
            {
                payload,
            }: PayloadAction<number>
        ) => {
            state.aptos.balance.amount = payload
        },
        setSolanaBalance: (
            state,
            {
                payload,
            }: PayloadAction<number>
        ) => {
            state.solana.balance.amount = payload
        },
        triggerRefreshAptosBalance: (
            state
        ) => {
            state.aptos.balance.refreshBalanceKey += 1
        },
        triggerRefreshSolanaBalance: (
            state
        ) => {
            state.solana.balance.refreshBalanceKey += 1
        },
    },
})

export const {
    setPreferenceChainKey,
    setAptosCredential,
    setSolanaCredential,
    setAptosBalance,
    setSolanaBalance,
    triggerRefreshAptosBalance,
    triggerRefreshSolanaBalance
} = chainSlice.actions
export const chainReducer = chainSlice.reducer
