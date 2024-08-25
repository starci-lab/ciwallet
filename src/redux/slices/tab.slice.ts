import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export enum BridgeTab {
    Transfer = "transfer",
    Redeem = "redeem",
}

export interface TabState {
  bridgeTab: BridgeTab
}

const initialState: TabState = {
    bridgeTab: BridgeTab.Transfer
}

export const tabSlice = createSlice({
    name: "tabReducer",
    initialState,
    reducers: {
        switchBridgeTab: (state, { payload }: PayloadAction<BridgeTab>) => {
            state.bridgeTab = payload
        }
    }
})

export const { switchBridgeTab } = tabSlice.actions
export const tabReducer = tabSlice.reducer