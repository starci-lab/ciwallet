"use client"

import React from "react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Snippet,
    Spacer,
    Link,
} from "@nextui-org/react"
import { useBridgeTransferResultModalDiscloresure } from "@/hooks"
import { useAppSelector } from "@/redux"
import { truncateString } from "@/utils"
import { getExplorerUrl } from "@/services"

export const BridgeTransferResultModal = () => {
    const { isOpen, onClose } = useBridgeTransferResultModalDiscloresure()

    const result = useAppSelector((state) => state.resultReducer.bridge.transfer)
    const { vaa, txHash } = { ...result }

    const { preferenceChainKey, network } = useAppSelector(
        (state) => state.chainReducer
    )

    return (
        <Modal hideCloseButton isOpen={isOpen}>
            <ModalContent>
                <ModalHeader className="p-4 pb-2 font-bold">Result</ModalHeader>
                <ModalBody className="p-4">
                    <div>
                        <div>
                            <div className="text-sm">Serialized VAA</div>
                            <Spacer y={1.5} />
                            <Snippet
                                hideSymbol
                                classNames={{
                                    pre: "text-justify !break-all !whitespace-pre-line !line-clamp-5",
                                }}
                                fullWidth
                            >
                                {vaa?.serializedVaa}
                            </Snippet>
                        </div>
                        <Spacer y={4} />
                        <div className="flex items-center justify-between">
                            <div className="text-sm">Tx Hash</div>
                            <Link
                                showAnchorIcon
                                isExternal
                                size="sm"
                                href={getExplorerUrl({
                                    chainKey: preferenceChainKey,
                                    value: txHash ?? "",
                                    type: "tx",
                                    network,
                                })}
                            >
                                {txHash ? truncateString(txHash) : null}
                            </Link>
                        </div>
                    </div>
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
