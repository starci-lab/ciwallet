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
import { useBridgeRedeemResultModalDiscloresure } from "@/hooks"

export const BridgeRedeemResultModal = () => {
    const { isOpen, onClose } =
    useBridgeRedeemResultModalDiscloresure()

    return (
        <Modal hideCloseButton isOpen={isOpen}>
            <ModalContent>
                <ModalHeader className="p-4 pb-2 font-bold">Redeem Result</ModalHeader>
                <ModalBody className="p-4">
                    <Card>
                        <CardBody className="p-0">
                            <div>
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
