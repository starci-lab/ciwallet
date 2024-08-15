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
import { useInviteModalDisclosure } from "@/hooks"

export const InviteModal = () => {
    const { isOpen, onOpenChange, onClose } = useInviteModalDisclosure()

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader className="p-4 pb-2 font-bold">Invite</ModalHeader>
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
    