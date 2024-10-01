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
    Link,
} from "@nextui-org/react"
import {
    useAccountsModalDisclosure,
    useCreateAccountFormik,
    useCreateAccountModalDisclosure,
} from "@/hooks"
import { useAppSelector } from "@/redux"
import { AccountUser } from "../../AccountUser"
import { PlusIcon } from "@heroicons/react/24/outline"

export const AccountsModal = () => {
    const { isOpen, onClose } = useAccountsModalDisclosure()
    const { onOpen: onCreateAccountModalOpen } =
    useCreateAccountModalDisclosure()

    const preferenceChainKey = useAppSelector(
        (state) => state.blockchainReducer.preferenceChainKey
    )
    const activeAccountNumber = useAppSelector(
        (state) =>
            state.authReducer.accountNumbers[preferenceChainKey].activeAccountNumber
    )
    const accounts = useAppSelector(
        (state) => state.authReducer.accountNumbers[preferenceChainKey].accounts
    )
    const accountNumbers = useAppSelector(
        (state) => state.authReducer.accountNumbers
    )
    console.log(accountNumbers)
    const entries = Object.entries(accounts)

    const formik = useCreateAccountFormik()

    return (
        <Modal isOpen={isOpen} hideCloseButton>
            <ModalContent>
                <ModalHeader className="p-4 pb-2 font-bold">Accounts</ModalHeader>
                <ModalBody className="p-4">
                    <Card>
                        <CardBody className="p-0">
                            <div>
                                {entries.map(([accountNumber, account], index) => (
                                    <div key={accountNumber}>
                                        <AccountUser
                                            accountNumber={Number.parseInt(accountNumber)}
                                            account={account}
                                            activeAccountNumber={activeAccountNumber}
                                        />
                                        {index !== entries.length - 1 && <Divider />}
                                    </div>
                                ))}
                            </div>
                        </CardBody>
                    </Card>
                    <Link
                        as="button"
                        onPress={async () => {
                            if (preferenceChainKey === "algorand") {
                                await formik.submitForm()
                                return
                            }
                            onCreateAccountModalOpen()
                        }}
                        size="sm"
                        color="primary"
                    >
                        <div className="flex gap-1 items-center">
                            <PlusIcon className="w-5 h-5" />
                            <div>Create Account</div>
                        </div>
                    </Link>
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
