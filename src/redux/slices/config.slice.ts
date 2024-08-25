import { createSlice } from "@reduxjs/toolkit"

export interface ConfigState {
  darkMode: boolean
}

const initialState: ConfigState = {
    darkMode: false
}

export const configSlice = createSlice({
    name: "configReducer",
    initialState,
    reducers: {
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode
        }
    }
})

export const { toggleDarkMode } = configSlice.actions
export const configReducer = configSlice.reducer