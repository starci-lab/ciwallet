import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface StoredAccount {
  imageUrl: string;
  name: string;
}

export interface ChainAccountNumber {
  accounts: Record<number, StoredAccount>;
  activeAccountNumber: number;
}

export type AccountNumbers = Record<string, ChainAccountNumber>;

export interface AuthState {
  mnemonic: string;
  accountNumbers: AccountNumbers;
  password: string;
  hasAuthBefore: boolean;
  loaded: boolean;
}

export interface CreateAccountParams {
  accountNumber: number;
  chainKey: string;
  account: StoredAccount;
}

export interface SetActiveAccountNumber {
  preferenceChainKey: string;
  accountNumber: number;
}

const initialState: AuthState = {
    mnemonic: "",
    accountNumbers: {
        aptos: {
            activeAccountNumber: 0,
            accounts: {
                0: {
                    imageUrl: "",
                    name: "Account 0",
                },
            },
        },
        solana: {
            activeAccountNumber: 0,
            accounts: {
                0: {
                    imageUrl: "",
                    name: "Account 0",
                },
            },
        },
    },
    loaded: false,
    password: "",
    hasAuthBefore: false,
}

export const authSlice = createSlice({
    name: "authReducer",
    initialState,
    reducers: {
        setMnemonic: (state, { payload }: PayloadAction<string>) => {
            state.mnemonic = payload
        },
        setAccountNumbers: (
            state,
            { payload: { aptos, solana } }: PayloadAction<Partial<AccountNumbers>>
        ) => {
            if (aptos) {
                state.accountNumbers.aptos = aptos
            }
            if (solana) {
                state.accountNumbers.solana = solana
            }
        },
        loadAccountNumbers: (state) => {
            state.loaded = true
        },
        createAccount: (
            state,
            {
                payload: { chainKey, account, accountNumber },
            }: PayloadAction<CreateAccountParams>
        ) => {
            switch (chainKey) {
            case "aptos": {
                state.accountNumbers.aptos.accounts[accountNumber] = account
                state.accountNumbers.aptos.activeAccountNumber = accountNumber
                break
            }
            case "solana": {
                state.accountNumbers.solana.accounts[accountNumber] = account
                state.accountNumbers.solana.activeAccountNumber = accountNumber
                break
            }
            default:
                break
            }
        },
        setActiveAccountNumber: (
            state,
            {
                payload: { preferenceChainKey, accountNumber },
            }: PayloadAction<SetActiveAccountNumber>
        ) => {
            switch (preferenceChainKey) {
            case "aptos": {
                state.accountNumbers.aptos.activeAccountNumber = accountNumber
                break
            }
            case "solana": {
                state.accountNumbers.solana.activeAccountNumber = accountNumber
                break
            }
            default:
                break
            }
        },
        setPassword: (state, { payload }: PayloadAction<string>) => {
            state.password = payload
        },
        setHasAuthBefore: (state, { payload }: PayloadAction<boolean>) => {
            state.hasAuthBefore = payload
        },
    },
})

export const {
    setMnemonic,
    setAccountNumbers,
    setPassword,
    setHasAuthBefore,
    createAccount,
    setActiveAccountNumber,
    loadAccountNumbers,
} = authSlice.actions
export const authReducer = authSlice.reducer
