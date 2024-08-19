import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface AuthState {
  mnemonic: string;
  accountNumber: number;
  password: string;
  hasAuthBefore: boolean;
}

const initialState: AuthState = {
    mnemonic: "",
    accountNumber: 0,
    password: "",
    hasAuthBefore: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMnemonic: (state, { payload }: PayloadAction<string>) => {
            state.mnemonic = payload
        },
        setAccountNumber: (state, { payload }: PayloadAction<number>) => {
            state.accountNumber = payload
        },
        setPassword: (state, { payload }: PayloadAction<string>) => {
            state.password = payload
        },
        setHasAuthBefore: (state, { payload }: PayloadAction<boolean>) => { 
            state.hasAuthBefore = payload
        }
    }
})

export const { setMnemonic, setAccountNumber, setPassword, setHasAuthBefore } = authSlice.actions
export const authReducer = authSlice.reducer
