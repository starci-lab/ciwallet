import { BotType, defaultBotType } from "@/services"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AxiosProgressEvent } from "axios"

export interface Credentials {
  message: string;
  publicKey: string;
  signature: string;
  chainKey: string;
  network: string;
  telegramInitDataRaw: string;
  botType: BotType;
}

export interface PackageState {
  progress: AxiosProgressEvent | null;
  errorInDownload: boolean;
  finishDownloaded: boolean;
  totalSize: number;
}

export enum CifarmPackageKey {
  Data = "data",
  Framework = "framework",
  Loader = "loader",
  Wasm = "wasm",
}

export type CifarmPackages = Record<CifarmPackageKey, PackageState>;

export interface CifarmState {
  credentials: Credentials;
  packages: CifarmPackages;
  version: string;
  loadCifarmGameVersionKey: number;
}

export interface GameState {
  cifarm: CifarmState;
}

const initialState: GameState = {
    cifarm: {
        credentials: {
            chainKey: "",
            message: "",
            network: "",
            publicKey: "",
            signature: "",
            telegramInitDataRaw: "",
            botType: defaultBotType,
        },
        packages: {
            [CifarmPackageKey.Data]: {
                progress: null,
                errorInDownload: false,
                finishDownloaded: false,
                totalSize: 0,
            },
            [CifarmPackageKey.Framework]: {
                progress: null,
                errorInDownload: false,
                finishDownloaded: false,
                totalSize: 0,
            },
            [CifarmPackageKey.Loader]: {
                progress: null,
                errorInDownload: false,
                finishDownloaded: false,
                totalSize: 0,
            },
            [CifarmPackageKey.Wasm]: {
                progress: null,
                errorInDownload: false,
                finishDownloaded: false,
                totalSize: 0,
            },
        },
        version: "",
        loadCifarmGameVersionKey: 0,
    },
}

export const gameSlice = createSlice({
    name: "gameReducer",
    initialState,
    reducers: {
        setCifarmCredentials: (state, { payload }: PayloadAction<Credentials>) => {
            state.cifarm.credentials = payload
        },
        setCifarmPackagePartial: (
            state,
            { payload }: PayloadAction<SetCifarmPackagePartialParams>
        ) => {
            state.cifarm.packages[payload.key] = {
                ...state.cifarm.packages[payload.key],
                ...payload.partial,
            }
        },
        setCifarmGameVersion: (state, { payload }: PayloadAction<string>) => {
            state.cifarm.version = payload
        },
        triggerLoadCifarmGameVersion: (state) => {
            state.cifarm.loadCifarmGameVersionKey++
        },
    },
})

export const {
    setCifarmCredentials,
    setCifarmPackagePartial,
    setCifarmGameVersion,
    triggerLoadCifarmGameVersion,
} = gameSlice.actions
export const gameReducer = gameSlice.reducer

export interface SetCifarmPackagePartialParams {
  key: CifarmPackageKey;
  partial: Partial<PackageState>;
}
