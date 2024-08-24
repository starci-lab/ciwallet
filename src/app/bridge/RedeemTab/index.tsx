"use client"
import { useAppDispatch, useAppSelector } from "@/redux"
import React from "react"

export const RedeemTab = () => {
    const bridgeTab = useAppSelector((state) => state.tabReducer.bridgeTab)
    const dispatch = useAppDispatch()

    return (
        <div></div>
    )
}