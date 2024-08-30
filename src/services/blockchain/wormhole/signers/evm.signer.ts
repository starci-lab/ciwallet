import { Network, SignAndSendSigner, TxHash, UnsignedTransaction } from "@wormhole-foundation/sdk"
import {
    EvmChains,
    EvmUnsignedTransaction
} from "@wormhole-foundation/sdk-evm"
import { Network as SupportedNetwork } from "../../common"
import { SignerParams } from "../base.wormhole"
import { getEvmRpc } from "../../evm"
import { ethers } from "ethers"

export class EvmSigner<N extends Network, C extends EvmChains>
implements SignAndSendSigner<N, C> {
    account: ethers.Wallet
    constructor(
        private _chain: C,
        _privateKey: string,
        private client: ethers.JsonRpcProvider,
        private _debug?: boolean
    ) { 
        this.account = new ethers.Wallet(_privateKey, client)
    }

    chain(): C {
        return this._chain
    }

    address(): string {
        return this.account.address
    }

    async signAndSend(txns: Array<UnsignedTransaction>): Promise<Array<TxHash>> {
        const txids: Array<TxHash> = []
        for (const tx of txns) {
            const { description, transaction } = tx as EvmUnsignedTransaction<
                N,
                C
            >
            if (this._debug)
                console.log(`Signing ${description} for ${this.address()}`)
            const _tx  = await this.account.sendTransaction(transaction)
            const receipt = await this.client.waitForTransaction(_tx.hash)
            if (!receipt) throw new Error("Transaction failed")
            const { hash } = receipt
            txids.push(hash)
        }
        return txids
    }
}

export const evmSigner = ({
    privateKey,
    network,
    chain,
    debug,
}: SignerParams<Network, EvmChains>) => {
    const rpcUrl = getEvmRpc(chain, network as SupportedNetwork)
    const evmClient = new ethers.JsonRpcProvider(rpcUrl)
    return new EvmSigner(chain, privateKey, evmClient, debug)
}
