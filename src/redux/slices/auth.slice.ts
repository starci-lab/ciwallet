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

export interface Credentials {
  message: string;
  publicKey: string;
  signature: string;
  chainKey: string;
  network: string;
}

export interface AuthState {
  mnemonic: string;
  accountNumbers: AccountNumbers;
  password: string;
  hasAuthBefore: boolean;
  loaded: boolean;
  initialized: boolean;
  credentials: {
    cifarm: Credentials;
  };
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
        bsc: {
            activeAccountNumber: 0,
            accounts: {
                0: {
                    imageUrl: "",
                    name: "Account 0",
                },
            },
        },
        avalanche: {
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
    initialized: false,
    credentials: {
        cifarm: {
            chainKey: "",
            message: "",
            network: "",
            publicKey: "",
            signature: "",
        },
    },
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
            {
                payload: { aptos, solana, bsc },
            }: PayloadAction<Partial<AccountNumbers>>
        ) => {
            if (aptos) {
                state.accountNumbers.aptos = aptos
            }
            if (solana) {
                state.accountNumbers.solana = solana
            }
            if (bsc) {
                state.accountNumbers.bsc = bsc
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
            state.accountNumbers[chainKey].accounts[accountNumber] = account
            state.accountNumbers[chainKey].activeAccountNumber = accountNumber
        },
        setActiveAccountNumber: (
            state,
            {
                payload: { preferenceChainKey, accountNumber },
            }: PayloadAction<SetActiveAccountNumber>
        ) => {
            state.accountNumbers[preferenceChainKey].activeAccountNumber =
        accountNumber
        },
        setPassword: (state, { payload }: PayloadAction<string>) => {
            state.password = payload
        },
        setHasAuthBefore: (state, { payload }: PayloadAction<boolean>) => {
            state.hasAuthBefore = payload
        },
        setInitialized: (state, { payload }: PayloadAction<boolean>) => {
            state.initialized = payload
        },
        setCifarmCredentials: (state, { payload }: PayloadAction<Credentials>) => {
            state.credentials.cifarm = payload
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
    setInitialized,
    setCifarmCredentials
} = authSlice.actions
export const authReducer = authSlice.reducer
