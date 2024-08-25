"use client"
import { useAppSelector } from "@/redux"
import React from "react"
import { Token } from "./Token"

export const Tokens = () => {
    const preferenceChainKey = useAppSelector(
        (state) => state.chainReducer.preferenceChainKey
    )

    const { tokens } = { ...useAppSelector(
        (state) => state.tokenReducer.tokens[preferenceChainKey]
    ) }
    const _tokens = tokens || []

    return (
        <div className="grid gap-2">
            {_tokens.map((token) => (
                <Token key={token.key} token={token} />
            ))}
        </div>
    )
}
