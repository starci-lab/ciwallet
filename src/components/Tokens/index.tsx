"use client"
import { useAppSelector } from "@/redux"
import React from "react"
import { Token } from "./Token"

export const Tokens = () => {
    const preferenceChainKey = useAppSelector(
        (state) => state.chainReducer.preferenceChainKey
    )

    const tokens = useAppSelector(
        (state) => state.chainReducer.chains[preferenceChainKey].tokens
    )

    return (
        <div className="grid gap-2">
            {tokens.map((token) => (
                <Token key={token.key} token={token} />
            ))}
        </div>
    )
}
