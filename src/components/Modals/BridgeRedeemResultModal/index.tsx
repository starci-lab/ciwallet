"use client"

import React from "react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Link,
} from "@nextui-org/react"
import { useBridgeRedeemResultModalDiscloresure } from "@/hooks"
import { useAppSelector } from "@/redux"
import { explorerUrl } from "@/services"
import { truncateString, valuesWithKey } from "@/utils"
import { defaultChainKey } from "@/config"
import { deserialize, VAA } from "@wormhole-foundation/sdk"
export const BridgeRedeemResultModal = () => {
    const { isOpen, onClose } =
    useBridgeRedeemResultModalDiscloresure()
    
    const result = useAppSelector(state => state.resultReducer.bridge.redeem)
    const { vaa, txHash } = { ...result }
    const network = useAppSelector(state => state.blockchainReducer.network)

    let deserializedVaa: VAA<"TokenBridge:Transfer"> | undefined
    if (vaa) {
        deserializedVaa = deserialize<"TokenBridge:Transfer">("TokenBridge:Transfer", vaa.serializedVaa)
    }
    const chains = useAppSelector(state => state.blockchainReducer.chains)
    const targetChain = valuesWithKey(chains).find(({ chain }) => chain === deserializedVaa?.payload.to.chain)

    return (
        <Modal hideCloseButton isOpen={isOpen}>
            <ModalContent>
                <ModalHeader className="p-4 pb-2 font-bold">Redeem Result</ModalHeader>
                <ModalBody className="p-4">
                    <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                            <div className="text-sm">Tx Hash</div>
                            <Link
                                showAnchorIcon
                                isExternal
                                size="sm"
                                href={explorerUrl({
                                    chainKey: targetChain?.key ?? defaultChainKey,
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
