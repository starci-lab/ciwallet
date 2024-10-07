import { constantConfig, envConfig } from "@/config"
import { setCifarmCredentials, useAppDispatch, useAppSelector } from "@/redux"
import { usePathname } from "next/navigation"
import { Client, Session } from "@heroiclabs/nakama-js"
import { useEffect, useState } from "react"
import {
    Platform,
    chainKeyToPlatform,
    requestMessage,
    signMessage,
} from "@/services"
import useSWRMutation, { SWRMutationResponse } from "swr/mutation"
import { useBase } from "."

export interface UseCifarmNakamaReturn {
  authSwr: SWRMutationResponse<void, unknown>;
  client: Client | undefined;
  session: Session | undefined;
}

export const _useCifarmNakama = (): UseCifarmNakamaReturn => {
    const [client, setClient] = useState<Client | undefined>()
    const [session, setSession] = useState<Session | undefined>()

    const pathname = usePathname()
    const mnemonic = useAppSelector((state) => state.authReducer.mnemonic)
    const referrerUserId = useAppSelector((state) => state.authReducer.telegramInfo.referrerUserId)
 
    useEffect(() => {
        if (pathname != constantConfig().path.cifarm) return
        if (mnemonic === "") return

        const client = new Client(
            envConfig().externals.cifarm.core.key,
            envConfig().externals.cifarm.core.host,
            envConfig().externals.cifarm.core.port,
            envConfig().externals.cifarm.core.useSsl
        )
        setClient(client)
    }, [pathname, mnemonic])

    const preferenceChainKey = useAppSelector(
        (state) => state.blockchainReducer.preferenceChainKey
    )
    const { privateKey, publicKey, address } = useAppSelector(
        (state) => state.authReducer.credentials[preferenceChainKey]
    )
    const network = useAppSelector((state) => state.blockchainReducer.network)
    const dispatch = useAppDispatch()

    const authSwr = useSWRMutation("CIFARM_AUTH_SWR", async () => {
        const {
            data: { message },
        } = await requestMessage()
        if (privateKey === "") return
        const signature = await signMessage({
            chainKey: preferenceChainKey,
            message,
            privateKey,
        })
        if (!client) return
        let _publicKey = publicKey
        const platform = chainKeyToPlatform(preferenceChainKey)
        if (platform === Platform.Evm) {
            _publicKey = address
        }
        console.log(referrerUserId)

        const session = await client.authenticateCustom(
            "starci",
            false,
            undefined,
            {
                message,
                publicKey: _publicKey,
                signature,
                chainKey: preferenceChainKey,
                network,
                referrerUserId,
            }
        )

        setSession(session)
        dispatch(
            setCifarmCredentials({
                chainKey: preferenceChainKey,
                message,
                network,
                publicKey: _publicKey,
                signature,
            })
        )
    })

    return {
        authSwr,
        client,
        session,
    }
}

export const useCifarmNakama = () => {
    const { cifarmNakama } = useBase() 
    return cifarmNakama
}
