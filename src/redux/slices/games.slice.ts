import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface Credentials {
  message: string;
  publicKey: string;
  signature: string;
  chainKey: string;
  network: string;
}

export interface GameState {
    cifarm: {
        credentials: Credentials
    }
}

const initialState: GameState = {
    cifarm: {
        credentials :{
            chainKey: "",
            message: "",
            network: "",
            publicKey: "",
            signature: "",
        } 
    },
}

export const gameSlice = createSlice({
    name: "gameReducer",
    initialState,
    reducers: {
        setCifarmCredentials: (state, { payload }: PayloadAction<Credentials>) => {
            state.cifarm.credentials = payload
        },
    },
})

export const {
    setCifarmCredentials
} = gameSlice.actions
export const gameReducer = gameSlice.reducer