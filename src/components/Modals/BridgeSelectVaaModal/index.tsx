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
import { useBridgeSelectVaaModalDisclosure } from "@/hooks"
import { selectVaa, useAppDispatch, useAppSelector } from "@/redux"
import { VAAProfile } from "../../VAAProfile"

export const BridgeSelectVaaModal = () => {
    const { isOpen, onClose } = useBridgeSelectVaaModalDisclosure()

    const { selectedVaaIndex, storedVaas } = useAppSelector(
        (state) => state.vaaReducer
    )

    const dispatch = useAppDispatch()

    return (
        <Modal isOpen={isOpen} hideCloseButton>
            <ModalContent>
                <ModalHeader className="p-4 pb-2 font-bold">Select VAA</ModalHeader>
                <ModalBody className="p-4">
                    <Card>
                        <CardBody className="p-0">
                            <div>
                                {storedVaas
                                    .filter(({ isUsed }) => !isUsed)
                                    .map((vaa, index) => (
                                        <div key={vaa.key}>
                                            <VAAProfile
                                                vaa={vaa}
                                                index={index}
                                                selectedVaaIndex={selectedVaaIndex}
                                                onPress={() => {
                                                    dispatch(selectVaa(index))
                                                }}
                                                shadow="none"
                                                fullWidth
                                                isPressable
                                                disableRipple
                                            />
                                            {index !== storedVaas.length - 1 && <Divider />}
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
