import { UseDisclosureReturn } from "@nextui-org/use-disclosure"
import { use } from "react"
import { HooksContext } from "../provider.hooks"
import { _useInviteModalDisclosure } from "./useInviteModalDiscloresure"
import { _useBridgeSelectTokenModalDisclosure } from "./useBridgeSelectTokenModalDiscloresure"
import { _useSelectNetworkModalDisclosure } from "./useSelectNetworkModalDiscloresure"
import { _useAccountsModalDisclosure } from "./useAccountsModalDiscloresure"
import { _useCreateAccountModalDisclosure } from "./useCreateAccountModalDiscloresure"
import { _useBridgeSelectRecipientModalDisclosure } from "./useBridgeSelectRecipientModalDiscloresure"

export interface UseModalReturn {
    inviteModalDisclosure: UseDisclosureReturn
    accountsModalDisclosure: UseDisclosureReturn
    bridgeSelectTokenModalDisclosure: UseDisclosureReturn
    selectNetworkModalDiscloresure: UseDisclosureReturn
    createAccountModalDisclosure: UseDisclosureReturn
    bridgeSelectRecipientModalDisclosure: UseDisclosureReturn
}

export const _useModals = () : UseModalReturn => {
    const inviteModalDisclosure = _useInviteModalDisclosure()
    const accountsModalDisclosure = _useAccountsModalDisclosure()
    const bridgeSelectTokenModalDisclosure = _useBridgeSelectTokenModalDisclosure()
    const selectNetworkModalDiscloresure = _useSelectNetworkModalDisclosure()
    const createAccountModalDisclosure = _useCreateAccountModalDisclosure()
    const bridgeSelectRecipientModalDisclosure = _useBridgeSelectRecipientModalDisclosure()

    return {
        inviteModalDisclosure,
        accountsModalDisclosure,
        bridgeSelectTokenModalDisclosure,
        selectNetworkModalDiscloresure,
        createAccountModalDisclosure,
        bridgeSelectRecipientModalDisclosure
    }
}


export const useModals = () : UseModalReturn => {
    const { modals } = use(HooksContext)!

    return modals
}

export * from "./useInviteModalDiscloresure"
export * from "./useAccountsModalDiscloresure"
export * from "./useBridgeSelectTokenModalDiscloresure"
export * from "./useSelectNetworkModalDiscloresure"
export * from "./useCreateAccountModalDiscloresure"
export * from "./useBridgeSelectTokenModalDiscloresure"
export * from "./useBridgeSelectRecipientModalDiscloresure"