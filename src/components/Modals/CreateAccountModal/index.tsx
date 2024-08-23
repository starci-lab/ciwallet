"use client"

import React from "react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
} from "@nextui-org/react"
import { useCreateAccountFormik, useCreateAccountModalDisclosure } from "@/hooks"

export const CreateAccountModal = () => {
    const { isOpen, onClose } = useCreateAccountModalDisclosure()
    const formik = useCreateAccountFormik()

    return (
        <Modal isOpen={isOpen} hideCloseButton>
            <ModalContent>
                <ModalHeader className="p-4 pb-2 font-bold">Create Account</ModalHeader>
                <ModalBody className="p-4">
                    <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                        <Input
                            id="accountNumber"
                            label="Account Number"
                            size="lg"
                            placeholder="Input account number here"
                            description="Left account number blank to generate a new account number"
                            labelPlacement="outside"
                            value={formik.values.accountNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={!!(formik.touched.accountNumber && formik.errors.accountNumber)}
                            errorMessage={formik.touched.accountNumber && formik.errors.accountNumber}
                        />
                    </form>
                </ModalBody>
                <ModalFooter className="p-4 pt-2">
                    <Button color="primary" variant="bordered" onPress={onClose}>
            Close
                    </Button>
                    <Button color="primary" onPress={() => {
                        formik.handleSubmit()
                        onClose()  
                    }}>
            Create
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
