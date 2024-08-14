"use client"

import { HooksContext } from "@/hooks"
import { Button } from "@nextui-org/react"
import React, { use } from "react"

export const InviteButton = () => {
    const {
        modals: {
            inviteModalDiscloresure: { onOpen },
        },
    } = use(HooksContext)!

    return (
        <Button onPress={onOpen} color="primary">
            Invite
        </Button>
    )
}
