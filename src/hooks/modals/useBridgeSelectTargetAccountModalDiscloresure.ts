import { useDisclosure } from "@nextui-org/react"
import { UseDisclosureReturn } from "@nextui-org/use-disclosure"
import { useModals } from "."

export const _useBridgeSelectTargetAccountModalDisclosure = () : UseDisclosureReturn => {
    return useDisclosure()
}

export const useBridgeSelectTargetAccountModalDisclosure = () : UseDisclosureReturn => {
    const { bridgeSelectTargetAccountModalDisclosure } = useModals()
    return bridgeSelectTargetAccountModalDisclosure
}



