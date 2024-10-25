"use client"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Image,
    Card,
    CardBody,
    Spacer,
} from "@nextui-org/react"
import React from "react"
import {
    usePolkadotBalances,
    usePolkadotTokenDetailsModalDiscloresure,
} from "@/hooks"
import { useAppSelector } from "@/redux"
import { nativeTokenKey } from "@/config"
import { valuesWithKey } from "@/utils"
import { Parachain } from "./Parachain"

//polkadot token details
export const PolkadotTokenDetailsModal = () => {
    const { isOpen, onClose } = usePolkadotTokenDetailsModalDiscloresure()
    const preferenceChainKey = useAppSelector(
        (state) => state.blockchainReducer.preferenceChainKey
    )
    const baseAccounts = useAppSelector(
        (state) => state.authReducer.baseAccounts
    )
    const activePrivateKey = baseAccounts[preferenceChainKey]?.activePrivateKey
    const accountAddress =
    baseAccounts[preferenceChainKey]?.accounts[activePrivateKey]
        ?.accountAddress

    const { balancesSwr } = usePolkadotBalances({ address: accountAddress, tokenKey: nativeTokenKey })
    const { bifrost, moonbeam, relay, uniqueNetwork } = { ...balancesSwr.data }

    const network = useAppSelector((state) => state.blockchainReducer.network)
    const chains = useAppSelector((state) => state.blockchainReducer.chains)
    const token = chains[preferenceChainKey].tokens[nativeTokenKey][network]
    const polkadotParachains = useAppSelector(state => state.blockchainReducer.polkadotParachains)

    return (
        <Modal isOpen={isOpen} hideCloseButton>
            <ModalContent>
                <ModalHeader className="p-4 pb-2 font-bold">Token Details</ModalHeader>
                <ModalBody className="p-4">
                    <div className="grid gap-4">
                        {/* // relay chain */}
                        <div>
                            <div>Relay Chain</div>
                            <Spacer y={2}/>
                            <div>
                                <Card shadow="none" fullWidth>
                                    <CardBody className="p-3 bg-content2">
                                        <div className="flex gap-2 items-center">
                                            <div className="relative">
                                                <Image
                                                    removeWrapper
                                                    src={token.imageUrl}
                                                    className="w-10 h-10"
                                                />
                                            </div>
                                            <div>
                                                <div>{token?.name}</div>
                                                <div className="text-sm text-foreground-400">
                                                    {relay || 0} {token?.symbol}
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>          
                    </div>
                    <div>
                        <div>Parachains</div>
                        <Spacer y={2}/>
                        <div className="grid gap-2">
                            {
                                valuesWithKey(polkadotParachains).map((parachain) => (
                                    <Parachain key={parachain.key} parachain={parachain} />
                                ))
                            }
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
