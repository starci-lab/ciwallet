import { UseDisclosureReturn } from "@nextui-org/use-disclosure"
import { use } from "react"
import { HooksContext } from "../provider.hooks"
import { _useInviteModalDisclosure } from "./useInviteModalDiscloresure"
import { _useBridgeSelectTokenModalDisclosure } from "./useBridgeSelectTokenModalDiscloresure"
import { _useWarningModalDisclosure } from "./useWarningModalDiscloresure"
import { _useAccountsModalDisclosure } from "./useAccountsModalDiscloresure"
import { _useCreateAccountModalDisclosure } from "./useCreateAccountModalDiscloresure"
import { _useBridgeSelectRecipientModalDisclosure } from "./useBridgeSelectRecipientModalDiscloresure"
import { _useBridgeRedeemResultModalDiscloresure } from "./useBridgeRedeemResultModalDiscloresure"
import { _useBridgeTransferResultModalDiscloresure } from "./useBridgeTransferResultModalDiscloresure"
import { _useBridgeSelectVaaModalDisclosure } from "./useBridgeSelectVaaModalDiscloresure"
import { _useErrorModalDisclosure } from "./useErrorModalDiscloresure"
import { _usePrivateKeyModalDisclosure } from "./usePrivateKeyModalDiscloresure"
import { _useMnemonicModalDisclosure } from "./useMnemonicModalDiscloresure"
import { _useSelectNetworkModalDisclosure } from "./useSelectNetworkModalDiscloresure"

export interface UseModalReturn {
    inviteModalDisclosure: UseDisclosureReturn
    accountsModalDisclosure: UseDisclosureReturn
    bridgeSelectTokenModalDisclosure: UseDisclosureReturn
    selectNetworkModalDiscloresure: UseDisclosureReturn
    createAccountModalDisclosure: UseDisclosureReturn
    bridgeSelectRecipientModalDisclosure: UseDisclosureReturn
    bridgeRedeemResultModalDisclosure: UseDisclosureReturn
    bridgeTransferResultModalDisclosure: UseDisclosureReturn
    bridgeSelectVaaModalDisclosure: UseDisclosureReturn
    errorModalDisclosure: UseDisclosureReturn
    privateKeyModalDisclosure: UseDisclosureReturn
    mnemonicModalDisclosure: UseDisclosureReturn
    warningModalDiscloresure: UseDisclosureReturn
}

export const _useModals = () : UseModalReturn => {
    const inviteModalDisclosure = _useInviteModalDisclosure()
    const accountsModalDisclosure = _useAccountsModalDisclosure()
    const bridgeSelectTokenModalDisclosure = _useBridgeSelectTokenModalDisclosure()
    const selectNetworkModalDiscloresure = _useSelectNetworkModalDisclosure()
    const createAccountModalDisclosure = _useCreateAccountModalDisclosure()
    const bridgeSelectRecipientModalDisclosure = _useBridgeSelectRecipientModalDisclosure()
    const bridgeRedeemResultModalDisclosure = _useBridgeRedeemResultModalDiscloresure()
    const bridgeTransferResultModalDisclosure = _useBridgeTransferResultModalDiscloresure()
    const bridgeSelectVaaModalDisclosure = _useBridgeSelectVaaModalDisclosure()
    const errorModalDisclosure = _useErrorModalDisclosure()
    const privateKeyModalDisclosure = _usePrivateKeyModalDisclosure()
    const mnemonicModalDisclosure = _useMnemonicModalDisclosure()
    const warningModalDiscloresure = _useWarningModalDisclosure()

    return {
        inviteModalDisclosure,
        accountsModalDisclosure,
        bridgeSelectTokenModalDisclosure,
        selectNetworkModalDiscloresure,
        createAccountModalDisclosure,
        bridgeSelectRecipientModalDisclosure,
        bridgeRedeemResultModalDisclosure,
        bridgeTransferResultModalDisclosure,
        bridgeSelectVaaModalDisclosure,
        errorModalDisclosure,
        privateKeyModalDisclosure,
        mnemonicModalDisclosure,
        warningModalDiscloresure
    }
}


export const useModals = () : UseModalReturn => {
    const { modals } = use(HooksContext)!

    return modals
}

export * from "./useInviteModalDiscloresure"
export * from "./useAccountsModalDiscloresure"
export * from "./useBridgeSelectTokenModalDiscloresure"
export * from "./useWarningModalDiscloresure"
export * from "./useCreateAccountModalDiscloresure"
export * from "./useBridgeSelectTokenModalDiscloresure"
export * from "./useBridgeSelectRecipientModalDiscloresure"
export * from "./useBridgeTransferResultModalDiscloresure"
export * from "./useBridgeRedeemResultModalDiscloresure"
export * from "./useBridgeSelectVaaModalDiscloresure"
export * from "./useErrorModalDiscloresure"
export * from "./usePrivateKeyModalDiscloresure"
export * from "./useMnemonicModalDiscloresure"
export * from "./useWarningModalDiscloresure"
export * from "./useSelectNetworkModalDiscloresure"