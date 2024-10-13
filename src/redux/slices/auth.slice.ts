import { BaseAccounts, ChainAccount, StoredAccount } from "@/services"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface AuthState {
  mnemonic: string;
  telegramInfo: TelegramInfo;
  baseAccounts: BaseAccounts;
  saveBaseAccountsKey: number;
  password: string;
  hasAuthBefore: boolean;
  loaded: boolean;
  initialized: boolean;
  current: string;
}

export interface AddAccountParams {
  privateKey: string;
  chainKey: string;
  account: StoredAccount;
}

export interface ImportAccountParams {
  chainKey: string;
  privateKey: string;
  account: Omit<StoredAccount, "accountNumber">;
}

export interface SetActivePrivateKey {
  chainKey: string;
  privateKey: string;
}

export interface SetCredentialParams {
  account: Partial<ChainAccount>;
  chainKey: string;
}

export interface TelegramInfo {
  id: number;
  username: string;
  referrerUserId: string;
  initDataRaw: string;
}

const initialState: AuthState = {
    mnemonic: "",
    telegramInfo: {
        id: 0,
        username: "",
        referrerUserId: "",
        initDataRaw: "",
    },
    saveBaseAccountsKey: 0,
    baseAccounts: {},
    loaded: false,
    password: "",
    hasAuthBefore: false,
    initialized: false,
    current: "",
}

export const authSlice = createSlice({
    name: "authReducer",
    initialState,
    reducers: {
        setMnemonic: (state, { payload }: PayloadAction<string>) => {
            state.mnemonic = payload
        },
        setTelegramInfo: (state, { payload }: PayloadAction<TelegramInfo>) => {
            state.telegramInfo = payload
        },
        setBaseAccounts: (state, { payload }: PayloadAction<BaseAccounts>) => {
            state.baseAccounts = payload
        },
        triggerSaveBaseAccounts: (state) => {
            state.saveBaseAccountsKey++
        },
        loadBaseAccounts: (state) => {
            state.loaded = true
        },
        addAccount: (
            state,
            {
                payload: { chainKey, account, privateKey },
            }: PayloadAction<AddAccountParams>
        ) => {
            // if the chain doesn't exist, create it
            if (!state.baseAccounts[chainKey]) {
                state.baseAccounts[chainKey] = {
                    accounts: {},
                    activePrivateKey: "",
                }
            }
            state.baseAccounts[chainKey].accounts[privateKey] = account
            state.baseAccounts[chainKey].activePrivateKey = privateKey
        },
        setActivePrivateKey: (
            state,
            { payload: { chainKey, privateKey } }: PayloadAction<SetActivePrivateKey>
        ) => {
            state.baseAccounts[chainKey].activePrivateKey = privateKey
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
        setCurrent: (state, { payload }: PayloadAction<string>) => {
            state.current = payload
        },
    },
})

export const {
    setMnemonic,
    setBaseAccounts,
    setPassword,
    setHasAuthBefore,
    addAccount,
    setActivePrivateKey,
    loadBaseAccounts,
    setTelegramInfo,
    setInitialized,
    triggerSaveBaseAccounts,
    setCurrent,
} = authSlice.actions
export const authReducer = authSlice.reducer
