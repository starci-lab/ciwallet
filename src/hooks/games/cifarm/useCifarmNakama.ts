import { constantConfig, envConfig } from "@/config"
import { useAppSelector } from "@/redux"
import { usePathname } from "next/navigation"
import { Client, Session } from "@heroiclabs/nakama-js"
import { useEffect, useState } from "react"
import { Platform, chainKeyToPlatform, requestMessage, signMessage } from "@/services"
import useSWRMutation, { SWRMutationResponse } from "swr/mutation"
import { useCifarm } from "."

const CIFARM_AUTH="CIFARM_AUTH"

export interface UseCifarmNakamaReturn {
    cifarmAuthSwr: SWRMutationResponse<
    void,
    unknown,
    typeof CIFARM_AUTH
  >;
  client: Client | undefined;
  session: Session | undefined;
}

export const _useCifarmNakama = () : UseCifarmNakamaReturn => {
    const [client, setClient] = useState<Client | undefined>()
    const [session, setSession] = useState<Session | undefined>()

    const pathname = usePathname()
    const mnemonic = useAppSelector((state) => state.authReducer.mnemonic)
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

    const preferenceChainKey = useAppSelector(state => state.blockchainReducer.preferenceChainKey)
    const { privateKey, publicKey, address } = useAppSelector(state => state.blockchainReducer.credentials[preferenceChainKey])

    const cifarmAuthSwr = useSWRMutation(
        CIFARM_AUTH,
        async () => {
            const {
                data: { message },
            } = await requestMessage()
            if (privateKey === "") return
            const signature = await signMessage({
                chainKey: preferenceChainKey,
                message,
                privateKey
            })  
            if (!client) return
            let _publicKey = publicKey
            const platform = chainKeyToPlatform(preferenceChainKey)
            if (platform === Platform.Evm) {
                _publicKey = address
            }

            const session = await client.authenticateCustom("starci", false, undefined, {
                message,
                publicKey: _publicKey,
                signature,
                chainKey: preferenceChainKey
            })
            setSession(session)
        }
    )

    useEffect(() => {
        if (!client) return
        const handleEffect = async () => {
            await cifarmAuthSwr.trigger()
        }
        handleEffect()
    }, [client])

    return {
        cifarmAuthSwr,
        client,
        session,
    }
}

export const useCifarmNakama = () => {
    const { nakama } = useCifarm()
    return nakama
}