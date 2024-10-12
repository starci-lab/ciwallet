import { Network, TokenInfo } from "@/config"
import { createSlice } from "@reduxjs/toolkit"
import { v4 } from "uuid"

export interface StoredVaa {
    key: string
    serializedVaa: string 
    txHash?: string
    network: Network
    senderAddress?: string
    tokenInfo?: TokenInfo
    bridgeProtocolKey: string
}
export type StoredVaas = Record<string, StoredVaa>

export interface VaaState {
  storedVaas: StoredVaas;
  selectedKey: string;
  saveStoredVaasKey: number;
}

const initialState: VaaState = {
    storedVaas: {},
    selectedKey: "",
    saveStoredVaasKey: 0,
}

export const vaaSlice = createSlice({
    name: "vaaReducer",
    initialState,
    reducers: {
        setVaas: (state, { payload }: { payload: StoredVaas }) => {
            state.storedVaas = payload
            state.selectedKey = Object.keys(state.storedVaas).at(-1) || ""
        },
        addStoredVaa: (
            state,
            { payload }: { payload: Omit<StoredVaa, "key"> }
        ) => {
            const key = v4()
            const _payload: StoredVaa = { ...payload, key }
            state.storedVaas[key] = _payload
            state.selectedKey = key
        },
        triggerSaveStoredVaas: (state) => {
            state.saveStoredVaasKey++
        },
        useVaa: (state, { payload }: { payload: string }) => {
            delete state.storedVaas[payload]
            state.selectedKey = Object.keys(state.storedVaas).at(-1) || ""
        },
        selectVaa: (state, { payload }: { payload: string }) => {
            state.selectedKey = payload
        },
    },
})

export const {
    addStoredVaa,
    useVaa,
    setVaas,
    selectVaa,
    triggerSaveStoredVaas,
} = vaaSlice.actions
export const vaaReducer = vaaSlice.reducer
