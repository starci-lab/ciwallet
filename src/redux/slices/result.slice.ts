import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { StoredVaa } from "./vaa.slice"

export interface BridgeTransferResult {
    vaa: Omit<StoredVaa, "isUsed" | "key" | "createdAt">,
    txHash: string
}

export interface BridgeRedeemResult {
    vaa: Omit<StoredVaa, "isUsed" | "key" | "createdAt">,
    txHash: string
}

export interface ResultState {
    bridge: {
        transfer?: BridgeTransferResult,
        redeem?: BridgeRedeemResult
    }
}

const initialState: ResultState = {
    bridge: {
    }
}

export const resultSlice = createSlice({
    name: "resultReducer",
    initialState,
    reducers: {
        setBridgeTransferResult: (state, { payload }: PayloadAction<BridgeTransferResult | undefined>) => {
            state.bridge.transfer = payload
        },
        setBridgeRedeemResult: (state, { payload }: PayloadAction<BridgeRedeemResult | undefined>) => {
            state.bridge.redeem = payload
        }
    }
})

export const { setBridgeTransferResult, setBridgeRedeemResult } = resultSlice.actions
export const resultReducer = resultSlice.reducer