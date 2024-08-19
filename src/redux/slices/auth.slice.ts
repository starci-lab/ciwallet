import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface AuthState {
  mnemonic: string;
}

const initialState: AuthState = {
    mnemonic: "",
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMnemonic: (state, { payload }: PayloadAction<string>) => {
            state.mnemonic = payload
        },
    },
})

export const { setMnemonic } = authSlice.actions
export const authReducer = authSlice.reducer
