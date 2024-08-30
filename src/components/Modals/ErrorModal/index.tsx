"use client"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react"
import React from "react"
import { useErrorModalDisclosure } from "@/hooks"

export const ErrorModal = () => {
    const { isOpen, onClose } = useErrorModalDisclosure()
    return (
        <Modal isOpen={isOpen} hideCloseButton>
            <ModalContent>
                <ModalHeader className="p-4 pb-2 font-bold">Error</ModalHeader>
                <ModalBody className="p-4">
                    <div className="text-sm">An unexpected error occurred. Please try again.</div>
                </ModalBody>
                <ModalFooter className="p-4 pt-2">
                    <Button color="primary" variant="bordered" onPress={onClose}>
            Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}