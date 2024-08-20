import { UseDisclosureReturn } from "@nextui-org/use-disclosure"
import { use } from "react"
import { HooksContext } from "../provider.hooks"
import { _useInviteModalDisclosure } from "./useInviteModalDiscloresure"
import { _useBridgeSelectTokenModalDisclosure } from "./useBridgeSelectTokenModalDiscloresure"

export interface UseModalReturn {
    inviteModalDisclosure: UseDisclosureReturn
    settingsModalDisclosure: UseDisclosureReturn
    bridgeSelectTokenModalDisclosure: UseDisclosureReturn
}

export const _useModals = () : UseModalReturn => {
    const inviteModalDisclosure = _useInviteModalDisclosure()
    const settingsModalDisclosure = _useInviteModalDisclosure()
    const bridgeSelectTokenModalDisclosure = _useBridgeSelectTokenModalDisclosure()

    return {
        inviteModalDisclosure,
        settingsModalDisclosure,
        bridgeSelectTokenModalDisclosure
    }
}


export const useModals = () : UseModalReturn => {
    const { modals } = use(HooksContext)!

    return modals
}

export * from "./useInviteModalDiscloresure"
export * from "./useSettingsModalDiscloresure"
export * from "./useBridgeSelectTokenModalDiscloresure"