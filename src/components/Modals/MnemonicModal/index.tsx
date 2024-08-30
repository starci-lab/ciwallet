"use client"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Snippet,
} from "@nextui-org/react"
import React from "react"
import { useMnemonicModalDisclosure } from "@/hooks"
import { useAppSelector } from "@/redux"
import { downloadTextFile } from "@/services"

export const MnemonicModal = () => {
    const { isOpen, onClose } = useMnemonicModalDisclosure()
    const mnemonic = useAppSelector(
        (state) => state.authReducer.mnemonic
    )

    return (
        <Modal isOpen={isOpen} hideCloseButton>
            <ModalContent>
                <ModalHeader className="p-4 pb-2 font-bold">Mnemonic</ModalHeader>
                <ModalBody className="p-4">
                    <div className="grid gap-4">
                        <Snippet
                            hideSymbol
                            classNames={{
                                pre: "text-justify !break-all !whitespace-pre-line !line-clamp-5",
                            }}
                            codeString={mnemonic}
                            fullWidth
                        >
                            {mnemonic}
                        </Snippet>
                    </div>
                </ModalBody>
                <ModalFooter className="p-4 pt-2">
                    <Button color="primary" variant="bordered" onPress={onClose}>
            Close
                    </Button>
                    <Button
                        onPress={() => downloadTextFile("mnemonic.txt", mnemonic)}
                        color="primary"
                    >
            Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
