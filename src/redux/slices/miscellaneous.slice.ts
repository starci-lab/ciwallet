import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface MiscellaneousState {
  warning: Warning
}

export interface Warning {
    warningMessage: string,
    processFn: (() => void) | (() => Promise<void>)
}

const initialState: MiscellaneousState = {
    warning: {
        warningMessage: "Are you sure you want to proceed?",
        processFn: () => {
            console.log("Warning process function not set")
        }
    }
}

export const miscellaneousSlice = createSlice({
    name: "miscellaneousSlice",
    initialState,
    reducers: {
        setWarning: (state, { payload }: PayloadAction<Warning>) => {
            state.warning = payload
        }
    }
})

export const { setWarning } = miscellaneousSlice.actions
export const miscellaneousReducer = miscellaneousSlice.reducer