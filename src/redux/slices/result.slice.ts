import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface BridgeTransferResult {
    serializedVaa: string,
    txHash: string
}

export interface ResultState {
    bridge: {
        transfer?: BridgeTransferResult,
        redeem?: {
            txHash: string
        }
    }
}

const initialState: ResultState = {
    bridge: {
    }
}

export const resultSlice = createSlice({
    name: "result",
    initialState,
    reducers: {
        setBridgeTransferResult: (state, { payload }: PayloadAction<BridgeTransferResult | undefined>) => {
            state.bridge.transfer = payload
        }
    }
})

export const { setBridgeTransferResult } = resultSlice.actions
export const resultReducer = resultSlice.reducer