"use client"

import React, { use } from "react"
import { HooksContext } from "@/hooks"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Snippet,
} from "@nextui-org/react"

export const InviteModal = () => {
    const {
        modals: {
            inviteModalDiscloresure: { isOpen, onOpenChange, onClose },
        },
    } = use(HooksContext)!
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader className="p-4 pb-2 font-bold">Invite</ModalHeader>
                <ModalBody className="p-4">
                    <Snippet>

                    </Snippet>
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
