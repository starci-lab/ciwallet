import { ethers } from "ethers"
import { abi } from "../abi/erc20.abi"
import { computeDenomination } from "@/utils"
import { getSeed } from "@/services/cryptography"
import { ChainAccount } from "../../common"

export const _getBalance = async (
    accountAddress: string,
    tokenAddress: string,
    rpcUrl: string,
    decimals: number
) => {
    let amount: bigint = BigInt(0)
    const provider = new ethers.JsonRpcProvider(rpcUrl)
    if (tokenAddress === "native") {
        amount = await provider.getBalance(accountAddress)
    } else {
        const contract = new ethers.Contract(tokenAddress , abi , provider)
        const [_balance, _decimals] = await Promise.all([
            contract.balanceOf(accountAddress),
            contract.decimals()
        ])
        amount = BigInt(_balance)
        decimals = Number(_decimals)
    }
    return computeDenomination(amount, decimals)
}

export const createEvmAccount = (
    mnemonic: string,
    accountNumber: number
): ChainAccount => {
    const seed = getSeed({
        mnemonic,
        accountNumber,
    })
    const account = ethers.HDNodeWallet.fromSeed(seed.subarray(0, 32)).derivePath(
        `m/44'/60'/0'/0/${accountNumber}`
    )
    return {
        address: account.address,
        privateKey: account.privateKey,
        publicKey: account.publicKey,
    }
}