import { createSlice } from "@reduxjs/toolkit"
import { TokenId } from "@wormhole-foundation/sdk"
import { v4 } from "uuid"

export interface StoredVaa {
    serializedVaa: string,
    isUsed: boolean,
    amount: number,
    tokenId: TokenId,
    fromChainKey: string,
    targetChainKey: string,
    fromAddress: string,
    targetAddress: string,
    key: string
}

export interface VaaState {
  storedVaas: Array<StoredVaa>,
  selectedVaaIndex: number
}

const initialState: VaaState = {
    storedVaas: [],
    selectedVaaIndex: 0
}

export const vaaSlice = createSlice({
    name: "vaa",
    initialState,
    reducers: {
        setVaas: (state, { payload }: { payload: Array<StoredVaa> }) => {
            state.storedVaas = payload
        },
        addStoredVaa: (state, { payload }: { payload: Omit<StoredVaa, "isUsed" | "key"> }) => {
            state.storedVaas.push({ ...payload, isUsed: false, key: v4() })
        },
        useVaa: (state, { payload }: { payload: string }) => {
            const storedVaa = state.storedVaas.find(storedVaa => storedVaa.serializedVaa === payload)
            if (storedVaa) {
                storedVaa.isUsed = true
            }
        },
        selectVaa: (state, { payload }: { payload: number }) => {
            state.selectedVaaIndex = payload
        }
    }
})

export const { addStoredVaa, useVaa, setVaas, selectVaa } = vaaSlice.actions
export const vaaReducer = vaaSlice.reducer