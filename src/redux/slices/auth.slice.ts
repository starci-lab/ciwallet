import { ChainAccount } from "@/services"
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
  telegramInfo: TelegramInfo;
  accountNumbers: AccountNumbers;
  saveAlgorandMnemonicsKey: number;
  saveAccountNumbersKey: number;
  password: string;
  hasAuthBefore: boolean;
  loaded: boolean;
  initialized: boolean;
  credentials: ChainCredentials;
  current: string;
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

export interface ChainCredential {
  address: string;
  privateKey: string;
  publicKey: string;
}

export interface SetCredentialParams {
  account: Partial<ChainAccount>;
  chainKey: string;
}

export type ChainCredentials = Record<string, ChainCredential>;

export interface TelegramInfo {
    id: number
    username: string
    referrerUserId: string
    initDataRaw: string
}

const initialState: AuthState = {
    mnemonic: "",
    telegramInfo: {
        id: 0,
        username: "",
        referrerUserId: "",
        initDataRaw: ""
    },
    saveAccountNumbersKey: 0,
    saveAlgorandMnemonicsKey: 0,
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
        algorand: {
            activeAccountNumber: 0,
            accounts: {
                0: {
                    imageUrl: "",
                    name: "Account 0",
                },
            },
        },
        sui: {
            activeAccountNumber: 0,
            accounts: {
                0: {
                    imageUrl: "",
                    name: "Account 0",
                },
            },
        },
    },
    credentials: {
        aptos: {
            address: "",
            privateKey: "",
            publicKey: "",
        },
        solana: {
            address: "",
            privateKey: "",
            publicKey: "",
        },
        bsc: {
            address: "",
            privateKey: "",
            publicKey: "",
        },
        avalanche: {
            address: "",
            privateKey: "",
            publicKey: "",
        },
        algorand: {
            address: "",
            privateKey: "",
            publicKey: "",
        },
        sui: {
            address: "",
            privateKey: "",
            publicKey: "",
        },
    },
    loaded: false,
    password: "",
    hasAuthBefore: false,
    initialized: false,
    current: ""
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
        setAccountNumbers: (
            state,
            {
                payload: { aptos, solana, bsc, algorand, avalanche, sui },
            }: PayloadAction<Partial<AccountNumbers>>
        ) => {
            if (avalanche) {
                state.accountNumbers.avalanche = avalanche
            }
            if (aptos) {
                state.accountNumbers.aptos = aptos
            }
            if (solana) {
                state.accountNumbers.solana = solana
            }
            if (bsc) {
                state.accountNumbers.bsc = bsc
            }
            if (algorand) {
                state.accountNumbers.algorand = algorand
            }
            if (sui) {
                state.accountNumbers.sui = sui
            }
        },
        triggerSaveAccountNumbers: (state) => {
            state.saveAccountNumbersKey++
        },
        triggerSaveAlgorandMnemonics: (state) => {
            state.saveAlgorandMnemonicsKey++
        },
        setCredential: (
            state,
            {
                payload: {
                    account: { address, privateKey, publicKey },
                    chainKey,
                },
            }: PayloadAction<SetCredentialParams>
        ) => {
            if (address) {
                state.credentials[chainKey].address = address
            }
            if (privateKey) {
                state.credentials[chainKey].privateKey = privateKey
            }
            if (publicKey) {
                state.credentials[chainKey].publicKey = publicKey
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
        setCurrent: (state, { payload }: PayloadAction<string>) => {
            state.current = payload
        },
    },
})

export const {
    setMnemonic,
    setAccountNumbers,
    setPassword,
    setHasAuthBefore,
    createAccount,
    triggerSaveAlgorandMnemonics,
    setActiveAccountNumber,
    loadAccountNumbers,
    setTelegramInfo,
    setInitialized,
    triggerSaveAccountNumbers,
    setCredential,
    setCurrent
} = authSlice.actions
export const authReducer = authSlice.reducer
