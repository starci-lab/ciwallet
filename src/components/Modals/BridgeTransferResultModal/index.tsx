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
import { explorerUrl } from "@/services"

export const BridgeTransferResultModal = () => {
    const { isOpen, onClose } = useBridgeTransferResultModalDiscloresure()

    const result = useAppSelector((state) => state.resultReducer.bridge.transfer)
    const { vaa, txHash } = { ...result }

    const network = useAppSelector(
        (state) => state.blockchainReducer.network
    )
    const preferenceChainKey = useAppSelector(
        (state) => state.blockchainReducer.preferenceChainKey
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
                        <Spacer y={1.5} />
                        <div className="text-xs text-warning text-justify">You can share the serialized VAA to enable the recipient to redeem their token.</div>
                        <Spacer y={4} />
                        <div className="flex items-center justify-between">
                            <div className="text-sm">Tx Hash</div>
                            <Link
                                showAnchorIcon
                                isExternal
                                size="sm"
                                href={explorerUrl({
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
