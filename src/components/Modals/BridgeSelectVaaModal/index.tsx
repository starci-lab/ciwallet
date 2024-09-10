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
    ScrollShadow,
} from "@nextui-org/react"
import { useBridgeSelectVaaModalDisclosure } from "@/hooks"
import { useAppSelector } from "@/redux"
import { VAAProfile } from "./VAAProfile"

export const BridgeSelectVaaModal = () => {
    const { isOpen, onClose } = useBridgeSelectVaaModalDisclosure()

    const selectedKey = useAppSelector(
        (state) => state.vaaReducer.selectedKey
    )

    const storedVaas = useAppSelector(state => state.vaaReducer.storedVaas.filter(({ isUsed }) => !isUsed))
    const reversedVaas = [...storedVaas].reverse()
    
    return (
        <Modal isOpen={isOpen} hideCloseButton>
            <ModalContent>
                <ModalHeader className="p-4 pb-2 font-bold">Select VAA</ModalHeader>
                <ModalBody className="p-4">
                    <Card>
                        <CardBody className="p-0">
                            <ScrollShadow className="max-h-[400px]">
                                <div>
                                    {reversedVaas
                                        .filter(({ isUsed }) => !isUsed)
                                        .map((vaa, index) => (
                                            <div key={vaa.key}>
                                                <VAAProfile
                                                    vaa={vaa}
                                                    selectedKey={selectedKey}
                                                />
                                                {index !== storedVaas.length - 1 && <Divider />}
                                            </div>
                                        ))}
                                </div>
                            </ScrollShadow>
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
