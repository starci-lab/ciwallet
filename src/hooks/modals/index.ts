import { UseDisclosureReturn } from "@nextui-org/use-disclosure"
import { use } from "react"
import { HooksContext } from "../provider.hooks"
import { _useInviteModalDisclosure } from "./useInviteModalDiscloresure"
import { _useBridgeSelectTokenModalDisclosure } from "./useBridgeSelectTokenModalDiscloresure"
import { _useSelectNetworkModalDisclosure } from "./useSelectNetworkModalDiscloresure"

export interface UseModalReturn {
    inviteModalDisclosure: UseDisclosureReturn
    settingsModalDisclosure: UseDisclosureReturn
    bridgeSelectTokenModalDisclosure: UseDisclosureReturn
    selectNetworkModalDiscloresure: UseDisclosureReturn
}

export const _useModals = () : UseModalReturn => {
    const inviteModalDisclosure = _useInviteModalDisclosure()
    const settingsModalDisclosure = _useInviteModalDisclosure()
    const bridgeSelectTokenModalDisclosure = _useBridgeSelectTokenModalDisclosure()
    const selectNetworkModalDiscloresure = _useSelectNetworkModalDisclosure()

    return {
        inviteModalDisclosure,
        settingsModalDisclosure,
        bridgeSelectTokenModalDisclosure,
        selectNetworkModalDiscloresure
    }
}


export const useModals = () : UseModalReturn => {
    const { modals } = use(HooksContext)!

    return modals
}

export * from "./useInviteModalDiscloresure"
export * from "./useSettingsModalDiscloresure"
export * from "./useBridgeSelectTokenModalDiscloresure"
export * from "./useSelectNetworkModalDiscloresure"