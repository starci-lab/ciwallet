import { TokenInfo, TokenInfos, chainConfig } from "@/config"
import { createSlice } from "@reduxjs/toolkit"
import { v4 } from "uuid"

export interface TokensState {
  tokens: Record<string, TokenInfos>;
}

const initialState: TokensState = {
    tokens: chainConfig().tokens,
}

export interface AddTokenParams {
  chainKey: string;
  tokenInfo: Omit<TokenInfo, "key" | "decimals" | "name" | "symbol">;
}

export interface GetTokenParams {
  chainKey: string;
  tokenKey: string;
}

export const tokenSlice = createSlice({
    name: "tokenReducer",
    initialState,
    reducers: {
        setTokens: (
            state,
            { payload }: { payload: Record<string, TokenInfos> }
        ) => {
            state.tokens = payload
        },
        addToken: (
            state,
            { payload: { chainKey, tokenInfo } }: { payload: AddTokenParams }
        ) => {
            const tokenInfos = state.tokens[chainKey]
            tokenInfos.tokens.push({
                ...tokenInfo,
                decimals: 8,
                name: "unknown",
                symbol: "UNKNOWN",
                key: v4(),
            })
        },
    }
})

export const { setTokens, addToken } = tokenSlice.actions
export const tokenReducer = tokenSlice.reducer
