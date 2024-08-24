"use client"

import React from "react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Card,
    CardBody
} from "@nextui-org/react"
import { useBridgeTransferResultModalDiscloresure } from "@/hooks"
import { useAppSelector } from "@/redux"

export const BridgeTransferResultModal = () => {
    const { isOpen, onClose } =
    useBridgeTransferResultModalDiscloresure()

    const result = useAppSelector(state => state.resultReducer.bridge.transfer) 
    const { serializedVaa, txHash } = { ...result}

    return (
        <Modal hideCloseButton isOpen={isOpen}>
            <ModalContent>
                <ModalHeader className="p-4 pb-2 font-bold">Transfer Result</ModalHeader>
                <ModalBody className="p-4">
                    <Card>
                        <CardBody className="p-0">
                            <div>
                                {serializedVaa}
                                {txHash}
                            </div>
                        </CardBody>
                    </Card>
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
