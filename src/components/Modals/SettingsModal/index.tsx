"use client"

import React from "react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Snippet,
} from "@nextui-org/react"
import { useSettingsModalDisclosure } from "@/hooks"

export const SettingsModal = () => {
    const { isOpen, onClose } = useSettingsModalDisclosure()

    return (
        <Modal isOpen={isOpen} hideCloseButton>
            <ModalContent>
                <ModalHeader className="p-4 pb-2 font-bold">Settings</ModalHeader>
                <ModalBody className="p-4">
                    <Snippet></Snippet>
                </ModalBody>
                <ModalFooter className="p-4 pt-2">
                    <Button color="primary" variant="bordered" onPress={onClose}>
            Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
            Invite
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
    