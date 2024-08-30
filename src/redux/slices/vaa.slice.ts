import { createSlice } from "@reduxjs/toolkit"
import { v4 } from "uuid"

export interface StoredVaa {
  serializedVaa: string;
  isUsed: boolean;
  amount: number;
  tokenKey: string;
  fromChainKey: string;
  targetChainKey: string;
  fromAddress: string;
  targetAddress: string;
  key: string;
  createdAt: string;
}

export interface VaaState {
  storedVaas: Array<StoredVaa>;
  selectedKey: string;
  saveStoredVaasKey: number;
}

const initialState: VaaState = {
    storedVaas: [],
    selectedKey: "",
    saveStoredVaasKey: 0,
}

export const vaaSlice = createSlice({
    name: "vaaReducer",
    initialState,
    reducers: {
        setVaas: (state, { payload }: { payload: Array<StoredVaa> }) => {
            state.storedVaas = payload
            state.selectedKey =
        state.storedVaas.findLast(({ isUsed }) => !isUsed)?.key || ""
        },
        addStoredVaa: (
            state,
            { payload }: { payload: Omit<StoredVaa, "isUsed" | "key" | "createdAt"> }
        ) => {
            state.storedVaas.push({
                ...payload,
                isUsed: false,
                key: v4(),
                createdAt: new Date().toISOString(),
            })
            state.selectedKey =
        state.storedVaas.findLast(({ isUsed }) => !isUsed)?.key || ""
        },
        triggerSaveStoredVaas: (state) => {
            state.saveStoredVaasKey++
        },
        useVaa: (state, { payload }: { payload: string }) => {
            state.storedVaas = state.storedVaas.map((vaa) => {
                if (vaa.serializedVaa === payload) {
                    return { ...vaa, isUsed: true }
                }
                return vaa
            })
            state.selectedKey =
        state.storedVaas.findLast(({ isUsed }) => !isUsed)?.key || ""
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
