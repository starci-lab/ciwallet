import { DeepPartial } from "@apollo/client/utilities"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface AccountNumbers {
    aptos: number,
    solana: number
}

export interface AuthState {
  mnemonic: string;
  accountNumbers: AccountNumbers;
  password: string;
  hasAuthBefore: boolean;
}

const initialState: AuthState = {
    mnemonic: "",
    accountNumbers: {
        aptos: 0,
        solana: 0
    },
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
        setAccountNumbers: (state, { payload: { aptos, solana } }: PayloadAction<DeepPartial<AccountNumbers>>) => {
            if (aptos) {
                state.accountNumbers.aptos = aptos
            }
            if (solana) {
                state.accountNumbers.solana = solana
            }
        },
        setPassword: (state, { payload }: PayloadAction<string>) => {
            state.password = payload
        },
        setHasAuthBefore: (state, { payload }: PayloadAction<boolean>) => { 
            state.hasAuthBefore = payload
        }
    }
})

export const { setMnemonic, setAccountNumbers, setPassword, setHasAuthBefore } = authSlice.actions
export const authReducer = authSlice.reducer
