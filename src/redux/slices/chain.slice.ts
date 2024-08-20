import { defaultChainKey } from "@/config"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface ChainState {
  preferenceChainKey: string;
}

const initialState: ChainState = {
    preferenceChainKey: defaultChainKey,
}

export const chainSlice = createSlice({
    name: "chain",
    initialState,
    reducers: {
        setPreferenceChainKey: (state, { payload }: PayloadAction<string>) => {
            state.preferenceChainKey = payload
        },
    },
})

export const { setPreferenceChainKey } = chainSlice.actions
export const chainReducer = chainSlice.reducer
