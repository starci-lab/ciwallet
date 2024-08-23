import React from "react"
import { InviteModal } from "./InviteModal"
import { AccountsModal } from "./AccountsModal"
import { BridgeSelectTokenModal } from "./BridgeSelectTokenModal"
import { SelectNetworkModal } from "./SelectNetworkModal"

export const Modals = () => {
    return (
        <div>
            <InviteModal />
            <AccountsModal />
            <BridgeSelectTokenModal />
            <SelectNetworkModal />
        </div>
    )
}
