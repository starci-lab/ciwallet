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
import { useAccountsModalDisclosure } from "@/hooks"
import { ChainAccountNumber, useAppSelector } from "@/redux"
import { AccountUser } from "../../AccountUser"

export const AccountsModal = () => {
    const { isOpen, onClose } = useAccountsModalDisclosure()

    const preferenceChainKey = useAppSelector(
        (state) => state.chainReducer.preferenceChainKey
    )
    const aptosAccountNumber = useAppSelector(
        (state) => state.authReducer.accountNumbers.aptos
    )
    const solanaAccountNumber = useAppSelector(
        (state) => state.authReducer.accountNumbers.solana
    )

    const map: Record<string, ChainAccountNumber> = {
        aptos: aptosAccountNumber,
        solana: solanaAccountNumber,
    }

    const { activeAccountNumber, accounts } = map[preferenceChainKey]

    return (
        <Modal isOpen={isOpen} hideCloseButton>
            <ModalContent>
                <ModalHeader className="p-4 pb-2 font-bold">Accounts</ModalHeader>
                <ModalBody className="p-4">
                    <Card>
                        <CardBody className="p-0">
                            <div>
                                {accounts.map((account, index) => (
                                    <div key={account.number} className="px-3 py-2">
                                        <AccountUser
                                            account={account}
                                            key={account.number}
                                            activeAccountNumber={activeAccountNumber}
                                        />
                                        {index !== accounts.length - 1 && <Divider />}
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
