import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ReactNode } from "react"

export interface MiscellaneousState {
  warning: Warning
  confirm: Confirm
}

export interface Warning {
    warningMessage: string,
    processFn: (() => void) | (() => Promise<void>)
}

export interface Confirm {
    confirmMessage: ReactNode,
    processFn: (() => void) | (() => Promise<void>)
    id: string,
}

const initialState: MiscellaneousState = {
    warning: {
        warningMessage: "Are you sure you want to proceed?",
        processFn: () => {
            console.log("Warning process function not set")
        },
    },
    confirm: {
        confirmMessage: "Are you sure you want to proceed?",
        processFn: () => {
            console.log("Confirm process function not set")
        },
        id: "",
    }
}

export const miscellaneousSlice = createSlice({
    name: "miscellaneousSlice",
    initialState,
    reducers: {
        setWarning: (state, { payload }: PayloadAction<Warning>) => {
            state.warning = payload
        },
        setConfirm: (state, { payload }: PayloadAction<Confirm>) => {
            state.confirm = payload
        }
    }
})

export const { setWarning, setConfirm } = miscellaneousSlice.actions
export const miscellaneousReducer = miscellaneousSlice.reducer