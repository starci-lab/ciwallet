import { UseDisclosureReturn } from "@nextui-org/use-disclosure"
import { use } from "react"
import { HooksContext } from "../provider.hooks"
import { _useInviteModalDisclosure } from "./useInviteModalDiscloresure"

export interface UseModalReturn {
    inviteModalDisclosure: UseDisclosureReturn
    settingsModalDisclosure: UseDisclosureReturn
}

export const _useModals = () : UseModalReturn => {
    const inviteModalDisclosure = _useInviteModalDisclosure()
    const settingsModalDisclosure = _useInviteModalDisclosure()

    return {
        inviteModalDisclosure,
        settingsModalDisclosure
    }
}


export const useModals = () : UseModalReturn => {
    const { modals } = use(HooksContext)!

    return modals
}

export * from "./useInviteModalDiscloresure"
export * from "./useSettingsModalDiscloresure"