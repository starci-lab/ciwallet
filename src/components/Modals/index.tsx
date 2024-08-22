import React from "react"
import { InviteModal } from "./InviteModal"
import { SettingsModal } from "./SettingsModal"
import { BridgeSelectTokenModal } from "./BridgeSelectTokenModal"
import { SelectNetworkModal } from "./SelectNetworkModal"

export const Modals = () => {
    return (
        <div>
            <InviteModal />
            <SettingsModal />
            <BridgeSelectTokenModal />
            <SelectNetworkModal />
        </div>
    )
}
