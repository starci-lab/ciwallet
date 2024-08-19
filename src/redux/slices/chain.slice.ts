import { defaultChainKey } from "@/config"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface ChainState {
  preferenceChain: string;
}

const initialState: ChainState = {
    preferenceChain: defaultChainKey,
}

export const chainSlice = createSlice({
    name: "chain",
    initialState,
    reducers: {
        setPreferenceChain: (state, { payload }: PayloadAction<string>) => {
            state.preferenceChain = payload
        },
    },
})

export const { setPreferenceChain } = chainSlice.actions
export const chainReducer = chainSlice.reducer
