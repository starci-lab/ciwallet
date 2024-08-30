"use client"

import React from "react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Divider,
    Card,
    CardBody,
} from "@nextui-org/react"
import {
    useBridgeTransferFormik,
    useBridgeSelectRecipientModalDisclosure,
} from "@/hooks"
import { useAppSelector } from "@/redux"
import { BridgeAccountUser } from "../../BridgeAccountUser"

export const BridgeSelectRecipientModal = () => {
    const { isOpen, onClose } = useBridgeSelectRecipientModalDisclosure()
    const formik = useBridgeTransferFormik()

    const accounts =
    useAppSelector(state => state.authReducer.accountNumbers[formik.values.targetChainKey].accounts)
    const entries = Object.entries(accounts)

    return (
        <Modal isOpen={isOpen} hideCloseButton>
            <ModalContent>
                <ModalHeader className="p-4 pb-2 font-bold">Select Recipient</ModalHeader>
                <ModalBody className="p-4">
                    <Card>
                        <CardBody className="p-0">
                            <div>
                                {entries.map(([ accountNumber, account ], index) => (
                                    <div key={accountNumber}>
                                        <BridgeAccountUser
                                            accountNumber={Number.parseInt(accountNumber)}
                                            account={account}
                                            key={accountNumber}
                                            targetChainKey={formik.values.targetChainKey}
                                        />
                                        {index !== entries.length - 1 && <Divider />}
                                    </div>
                                ))}
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
