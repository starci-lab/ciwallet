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
import { useBridgeTransferFormik, useBridgeSelectTokenModalDisclosure } from "@/hooks"
import { useAppSelector } from "@/redux"

export const BridgeSelectTokenModal = () => {
    const { isOpen, onClose } =
    useBridgeSelectTokenModalDisclosure()
    const formik = useBridgeTransferFormik()

    const preferenceChainKey = useAppSelector(state => state.blockchainReducer.preferenceChainKey)
    const tokens = Object.values(useAppSelector(state => state.blockchainReducer.chains[preferenceChainKey].tokens)) 
    
    return (
        <Modal hideCloseButton isOpen={isOpen}>
            <ModalContent>
                <ModalHeader className="p-4 pb-2 font-bold">Select Token</ModalHeader>
                <ModalBody className="p-4">
                    <Card>
                        <CardBody className="p-0">
                            <div>
                                {tokens.map(({ imageUrl, key, name, symbol }, index) => (
                                    <div key={key}>
                                        <Card
                                            disableRipple
                                            radius="none"
                                            shadow="none"
                                            fullWidth
                                            isPressable
                                            onPress={() => formik.setFieldValue("tokenKey", key)}
                                        >
                                            <CardBody className="px-3 py-2">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex gap-2 items-center">
                                                        <Image className="w-5 h-5" src={imageUrl} />
                                                        <div className="flex gap-1 items-center">
                                                            <div>{name}</div>
                                                            <div className="text-foreground-400">{symbol}</div>
                                                        </div>
                                                    </div>
                                                    {formik.values.tokenKey === key && (
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
