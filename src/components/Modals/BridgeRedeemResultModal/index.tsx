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
    Image,
    Avatar,
    Spacer
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
    const { tokenKey } = { ...vaa}
    const chain = useAppSelector(state => state.chainReducer.chains[vaa?.fromChainKey ?? defaultChainKey])
    const token = chain.tokens.find(({ key }) => key === tokenKey)
    
    const network = useAppSelector(state => state.chainReducer.network)

    const { addTokenSwrMutation: { trigger } } = useAddToken()

    const fromChain = useAppSelector(state => state.chainReducer.chains[vaa?.fromChainKey ?? defaultChainKey])

    return (
        <Modal hideCloseButton isOpen={isOpen}>
            <ModalContent>
                <ModalHeader className="p-4 pb-2 font-bold">Redeem Result</ModalHeader>
                <ModalBody className="p-4">
                    <div className="grid gap-4">
                        <div>
                            <div className="relative w-fit">
                                <Avatar
                                    isBordered
                                    src={chain?.imageUrl}
                                    classNames={{
                                        base: "absolute w-[30px] h-[30px] bottom-0 right-0 z-20 ring-0 bg-background",
                                    }}/>
                                  
                                <Image
                                    removeWrapper
                                    src={token?.imageUrl}
                                    className="w-[60px] h-[60px]"
                                />
                            </div>  
                            <Spacer y={1}/>
                            <div className="text-sm">
                                <div className="flex gap-2 items-center">
                                    <div className="text-sm">Received</div>
                                    <div className="flex gap-1 items-center">
                                        <div className="text-sm">{vaa?.amount}</div>
                                        <Image
                                            removeWrapper
                                            src={token?.imageUrl}
                                            className="w-5 h-5"
                                        />
                                    </div>
                                    <div className="text-sm">from</div>
                                    <div>
                                        <Image
                                            removeWrapper
                                            src={fromChain.imageUrl}
                                            className="w-5 h-5"
                                        />
                                    </div>
                                </div>
                            </div>
                            <Spacer y={4}/>
                            <Button color="primary" className="w-fit" onPress={() => trigger()}>Add Token</Button>
                        </div>
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
