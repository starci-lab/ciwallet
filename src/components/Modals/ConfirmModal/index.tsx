"use client"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@nextui-org/react"
import React from "react"
import { useConfirmModalDisclosure } from "@/hooks"
import { useAppSelector } from "@/redux"
import useSWRMutation from "swr/mutation"

export const ConfirmModal = () => {
    const { isOpen, onClose } = useConfirmModalDisclosure()
    const { processFn, confirmMessage, id } = useAppSelector(
        (state) => state.miscellaneousReducer.confirm
    )

    const { trigger, isMutating } = useSWRMutation(["PROCESS", id ], processFn)

    return (
        <Modal isOpen={isOpen} hideCloseButton>
            <ModalContent>
                <ModalHeader className="p-4 pb-2 font-bold">Confirm</ModalHeader>
                <ModalBody className="p-4">
                    <div className="text-sm">{confirmMessage}</div>
                </ModalBody>
                <ModalFooter className="p-4 pt-2">
                    <Button color="primary" variant="bordered" onPress={onClose}>
            Cancel
                    </Button>
                    <Button
                        color="primary"
                        isLoading={isMutating}
                        onPress={async () => {
                            await trigger()
                            onClose()
                        }}
                    >
            Process
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
