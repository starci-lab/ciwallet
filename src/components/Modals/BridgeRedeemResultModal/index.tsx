"use client"

import React from "react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Link
} from "@nextui-org/react"
import { useBridgeRedeemResultModalDiscloresure } from "@/hooks"
import { useAppSelector } from "@/redux"
import { getExplorerUrl } from "@/services"
import { truncateString } from "@/utils"
import { defaultChainKey } from "@/config"
import { useAddToken } from "./useAddToken"

export const BridgeRedeemResultModal = () => {
    const { isOpen, onClose } =
    useBridgeRedeemResultModalDiscloresure()
    
    const result = useAppSelector(state => state.resultReducer.bridge.redeem)
    const { vaa, txHash } = { ...result }

    const network = useAppSelector(state => state.chainReducer.network)

    const { addTokenSwrMutation: { trigger } } = useAddToken()

    return (
        <Modal hideCloseButton isOpen={isOpen}>
            <ModalContent>
                <ModalHeader className="p-4 pb-2 font-bold">Redeem Result</ModalHeader>
                <ModalBody className="p-4">
                    <div className="grid gap-4">
                        <Link as="button" onPress={() => trigger()}>Add Token</Link>
                        <div className="flex items-center justify-between">
                            <div className="text-sm">Tx Hash</div>
                            <Link
                                showAnchorIcon
                                isExternal
                                size="sm"
                                href={getExplorerUrl({
                                    chainKey: vaa?.targetChainKey ?? defaultChainKey,
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
