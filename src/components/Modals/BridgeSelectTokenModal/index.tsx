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
    CardBody,
    Image,
    Divider,
    CheckboxIcon,
} from "@nextui-org/react"
import { useBridgeFormik, useBridgeSelectTokenModalDisclosure } from "@/hooks"
import { chainConfig } from "@/config"

export const BridgeSelectTokenModal = () => {
    const { isOpen, onOpenChange, onClose } =
    useBridgeSelectTokenModalDisclosure()
    const formik = useBridgeFormik()

    const tokens = [...chainConfig().tokens]
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader className="p-4 pb-2 font-bold">Select Token</ModalHeader>
                <ModalBody className="p-4">
                    <Card>
                        <CardBody className="p-0">
                            <div>
                                {tokens.map(({ imageUrl, key, tokenId, name }, index) => (
                                    <div key={key}>
                                        <Card
                                            disableRipple
                                            radius="none"
                                            shadow="none"
                                            fullWidth
                                            isPressable
                                            onPress={() => formik.setFieldValue("tokenId", tokenId)}
                                        >
                                            <CardBody className="px-3 py-2">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex gap-2 items-center">
                                                        <Image className="w-5 h-5" src={imageUrl} />
                                                        {name}
                                                    </div>
                                                    {formik.values.tokenId.address === tokenId.address && formik.values.tokenId.chain === tokenId.chain && (
                                                        <CheckboxIcon isSelected className="w-3"/>
                                                    )}
                                                </div>             
                                            </CardBody>
                                        </Card>
                                        {
                                            index !== tokens.length - 1 && <Divider />
                                        }
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
