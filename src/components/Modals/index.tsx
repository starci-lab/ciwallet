import React from "react"
import { InviteModal } from "./InviteModal"
import { SettingsModal } from "./SettingsModal"
import { BridgeSelectTokenModal } from "./BridgeSelectTokenModal"

export const Modals = () => {
    return (
        <div>
            <InviteModal />
            <SettingsModal />
            <BridgeSelectTokenModal />
        </div>
    )
}
