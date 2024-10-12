"use client"
import {
    useBridgeRedeemFormik,
    useBridgeRedeemResultModalDiscloresure,
    useErrorModalDisclosure,
} from "@/hooks"
import { Button, Spacer } from "@nextui-org/react"
import React from "react"
import { EmptyProfile } from "./EmptyProfile"
import { VAAProfile } from "./VAAProfile"
import { useAppSelector } from "@/redux"

export const RedeemTab = () => {
    const storedVaas = useAppSelector(state => state.vaaReducer.storedVaas)

    const formik = useBridgeRedeemFormik()

    const { onOpen: onBridgeRedeemResultModalOpen } =
    useBridgeRedeemResultModalDiscloresure()

    const { onOpen: onErrorModalDisclosureOpen } =
    useErrorModalDisclosure()
    
    const hasVaa = Object.values(storedVaas).length > 0
    
    return (
        <div className="w-full h-full flex flex-col justify-between">
            <div>
                <div className="text-sm">Select VAA</div>
                <Spacer y={1.5} />
                <div>{hasVaa ? <VAAProfile /> : <EmptyProfile />}</div>
            </div>
            <Button
                color="primary"
                isDisabled={!hasVaa}
                isLoading={formik.isSubmitting}
                onPress={async () => {
                    try{
                        await formik.submitForm()
                        onBridgeRedeemResultModalOpen()
                    } catch (ex) {
                        console.error(ex)
                        onErrorModalDisclosureOpen()
                    }
                }}
                fullWidth
            >
          Redeem
            </Button>
        </div>
    )
}
