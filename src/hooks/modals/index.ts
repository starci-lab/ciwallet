import { useDisclosure } from "@nextui-org/react"
import { UseDisclosureReturn } from "@nextui-org/use-disclosure"

export interface UseModalReturn {
    inviteModalDiscloresure: UseDisclosureReturn
}

export const useModal = () : UseModalReturn => {
    const inviteModalDiscloresure = useDisclosure()

    return {
        inviteModalDiscloresure
    }
}