import { useAppSelector } from "@/redux"
import {
    aptosSigner,
    createAccount,
    evmSigner,
    solanaSigner,
} from "@/services"
import { Chain, SignAndSendSigner, Network } from "@wormhole-foundation/sdk"

export const useGenericSigner = <N extends Network, C extends Chain>(
    chainKey?: string,
    address?: string
): SignAndSendSigner<N, C> | undefined => {
    const mnemonic = useAppSelector((state) => state.authReducer.mnemonic)
    const network = useAppSelector((state) => state.chainReducer.network)
    const _accountNumbers = useAppSelector(
        (state) => state.authReducer.accountNumbers
    )
    if (!(mnemonic && chainKey && address)) return

    const { accounts } = _accountNumbers[chainKey]
    const accountNumbers = Object.keys(accounts).map((key) => Number(key))
    const _accounts = accountNumbers.map((accountNumber) =>
        createAccount(
            {
                mnemonic,
                accountNumber,
                chainKey
            }
        )
    )
    const account = _accounts.find(
        (account) => account.address === address
    )

    switch (chainKey) {
    case "aptos": {
        if (!account) {
            console.warn(`Aptos account not found for ${address}` )
            return
        }
        return aptosSigner({
            chain: "Aptos",
            network,
            privateKey: account.privateKey,
            address: account.address,
            debug: true,
        }) as unknown as SignAndSendSigner<N, C>
    }
    case "solana": {
        if (!account) {
            console.warn(`Solana account not found for ${address}` )
            return
        }
        return solanaSigner({
            chain: "Solana",
            network,
            privateKey: account.privateKey,
            debug: true,
        }) as unknown as SignAndSendSigner<N, C>
    }
    case "bsc": {
        if (!account) {
            console.warn(`Bsc account not found for ${address}` )
            return
        }
        return evmSigner({
            chain: "Bsc",
            network,
            privateKey: account.privateKey,
            debug: true,
        }) as unknown as SignAndSendSigner<N, C>
    }
    }
}
