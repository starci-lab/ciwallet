import { UseDisclosureReturn } from "@nextui-org/use-disclosure"
import { use } from "react"
import { HooksContext } from "../provider.hooks"
import { _useInviteModalDisclosure } from "./useInviteModalDiscloresure"

export interface UseModalReturn {
    inviteModalDisclosure: UseDisclosureReturn
}

export const _useModal = () : UseModalReturn => {
    const inviteModalDisclosure = _useInviteModalDisclosure()

    return {
        inviteModalDisclosure
    }
}


export const useModal = () : UseModalReturn => {
    const { modals: { inviteModalDisclosure }} = use(HooksContext)!

    return {
        inviteModalDisclosure
    }
}

export * from "./useInviteModalDiscloresure"