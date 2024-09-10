import { useAppSelector } from "@/redux"
import {
    chainKeyToChain,
    createAccount,
    parseNetwork,
    signer,
} from "@/services"
import { Chain, SignAndSendSigner, Network } from "@wormhole-foundation/sdk"

export const useGenericSigner = <N extends Network, C extends Chain>(
    chainKey?: string,
    address?: string
): SignAndSendSigner<N, C> | undefined => {
    const mnemonic = useAppSelector((state) => state.authReducer.mnemonic)
    const network = useAppSelector((state) => state.blockchainReducer.network)
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
    if (!account) return 

    const chain = chainKeyToChain(chainKey)
    return signer({
        chain,
        network: parseNetwork(network),
        privateKey: account.privateKey,
        address: account.address,
        debug: true,
    }) as unknown as SignAndSendSigner<N, C>
}
