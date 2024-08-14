import { useDisclosure } from "@nextui-org/react"

export const useModal = () => {
    const inviteModalDiscloresure = useDisclosure()

    return {
        inviteModalDiscloresure
    }
}