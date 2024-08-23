import React from "react"
import { InviteModal } from "./InviteModal"
import { AccountsModal } from "./AccountsModal"
import { BridgeSelectTokenModal } from "./BridgeSelectTokenModal"
import { SelectNetworkModal } from "./SelectNetworkModal"
import { CreateAccountModal } from "./CreateAccountModal"
import { BridgeSelectTargetAccountModal } from "./BridgeSelectTargetAccountModal"

export const Modals = () => {
    return (
        <div>
            <InviteModal />
            <AccountsModal />
            <BridgeSelectTokenModal />
            <SelectNetworkModal />
            <CreateAccountModal />
            <BridgeSelectTargetAccountModal />
        </div>
    )
}
