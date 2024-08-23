import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface StoredAccount {
    number: number,
    imageUrl: string ,
    name: string
}

export interface ChainAccountNumber {
    accounts: Array<StoredAccount>
    activeAccountNumber: number
}

export interface AccountNumbers {
    aptos: ChainAccountNumber,
    solana: ChainAccountNumber
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
        aptos: {
            activeAccountNumber: 0,
            accounts: [
                {
                    number: 0,
                    imageUrl: "",
                    name: "Account 0"
                }
            ]
        },
        solana: {
            activeAccountNumber: 0,
            accounts: [
                {
                    number: 0,
                    imageUrl: "",
                    name: "Account 0"
                }
            ]
        }
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
        setAccountNumbers: (state, { payload: { aptos, solana } }: PayloadAction<Partial<AccountNumbers>>) => {
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
