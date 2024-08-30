import { Network} from "@wormhole-foundation/sdk"
import { AptosChains, AptosSigner } from "@wormhole-foundation/sdk-aptos"
import { aptosNodes } from "../../aptos"
import { Account, Ed25519PrivateKey } from "@aptos-labs/ts-sdk"
import { SignerParams } from "../base.wormhole"
import { AptosAccount, AptosClient } from "aptos"

export const aptosSigner = ({
    privateKey,
    network,
    chain,
    address,
    debug
} : SignerParams<Network, AptosChains>) => {
    const account = Account.fromPrivateKey({
        privateKey: new Ed25519PrivateKey(privateKey),
        address
    })

    const _account = AptosAccount.fromAptosAccountObject({
        privateKeyHex: privateKey,
        publicKeyHex: account.publicKey.toString(),
        address: account.accountAddress.toString()
    })
    const aptosClient = new AptosClient(aptosNodes[network])
    return new AptosSigner(chain, _account, aptosClient, debug)
}