import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface ChainCredential {
    address: string,
    privateKey: string,
    publicKey: string
}

export interface CredentialState {
    aptos: ChainCredential,
    solana: ChainCredential
}

const initialState: CredentialState = {
    aptos: {
        address: "",
        privateKey: "",
        publicKey: ""
    },
    solana: {
        address: "",
        privateKey: "",
        publicKey: ""
    }
}

export const credentialSlice = createSlice({
    name: "credential",
    initialState,
    reducers: {
        setAptosCredential: (state, { payload }: PayloadAction<ChainCredential>) => {
            state.aptos = payload
        },
        setSolanaCredential: (state, { payload }: PayloadAction<ChainCredential>) => {
            state.solana = payload
        },
    }
})

export const { setAptosCredential, setSolanaCredential } = credentialSlice.actions
export const credentialReducer = credentialSlice.reducer
