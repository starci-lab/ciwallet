import { useDisclosure } from "@nextui-org/react"
import { UseDisclosureReturn } from "@nextui-org/use-disclosure"
import { useModals } from "."

export const _useSettingsModalDisclosure = () : UseDisclosureReturn => {
    return useDisclosure()
}

export const useSettingsModalDisclosure = () : UseDisclosureReturn => {
    const { settingsModalDisclosure } = useModals()
    return settingsModalDisclosure
}



