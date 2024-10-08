import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export enum BridgeTab {
    Transfer = "transfer",
    Redeem = "redeem",
    Wrap = "wrap",
}

export enum AssetsTab {
    Tokens = "tokens",
    NFTs = "nfts",
}

export interface TabState {
  bridgeTab: BridgeTab
  assetsTab: AssetsTab
}

const initialState: TabState = {
    bridgeTab: BridgeTab.Transfer,
    assetsTab: AssetsTab.Tokens
}

export const tabSlice = createSlice({
    name: "tabReducer",
    initialState,
    reducers: {
        switchBridgeTab: (state, { payload }: PayloadAction<BridgeTab>) => {
            state.bridgeTab = payload
        },
        switchAssetsTab: (state, { payload }: PayloadAction<AssetsTab>) => {
            state.assetsTab = payload
        }
    }
})

export const { switchBridgeTab, switchAssetsTab } = tabSlice.actions
export const tabReducer = tabSlice.reducer