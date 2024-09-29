"use client"
import { useUnity } from "./useUnity"
import { Unity } from "react-unity-webgl"
import React, { useEffect, useState } from "react"
import { HooksProvider } from "./provider.hooks"
import { Spinner } from "@nextui-org/react"
import { useAppSelector } from "@/redux"

const TIME_OUT = 1000
const QUIT_EVENT_NAME = "Quit"

export const WrappedUnityCanvas = () => {
    const {
        unity: {
            unityProvider,
            isLoaded,
            sendMessage,
            addEventListener,
            removeEventListener,
        },
    } = useUnity()

    const [devicePixelRatio, setDevicePixelRatio] = useState(
        window.devicePixelRatio
    )

    const router = useRouter()
    const handleQuit = () => router.push(constantConfig().path.home)

    useEffect(() => {
        addEventListener(QUIT_EVENT_NAME, handleQuit)
        return () => {
            removeEventListener(QUIT_EVENT_NAME, handleQuit)
        }
    }, [addEventListener, removeEventListener, handleQuit])

    useEffect(() => {
        const updateDevicePixelRatio = () => {
            setDevicePixelRatio(window.devicePixelRatio)
        }
        const mediaMatcher = window.matchMedia(
            `screen and (resolution: ${devicePixelRatio}dppx)`
        )
        mediaMatcher.addEventListener("change", updateDevicePixelRatio)
        return () => {
            mediaMatcher.removeEventListener("change", updateDevicePixelRatio)
        }
    }, [devicePixelRatio])

    const cifarmCrendentials = useAppSelector(
        (state) => state.gameReducer.cifarm.credentials
    )
    useEffect(() => {
        if (!isLoaded) return
        setTimeout(() => {
            sendMessage(
                "NakamaService",
                "SetCredentials",
                JSON.stringify(cifarmCrendentials)
            )
        }, TIME_OUT)
    }, [isLoaded])
    
    return (
        <div className="w-full h-full relative">
            {!isLoaded ? (
                <div className="absolute w-full h-full place-items-center grid">
                    <Spinner label="Loading..." size="lg" />
                </div>
            ) : null}

            <Unity
                className="w-full h-full"
                devicePixelRatio={devicePixelRatio}
                unityProvider={unityProvider}
            />
        </div>
    )
}

export const UnityCanvas = () => {
    return (
        <HooksProvider>
            <WrappedUnityCanvas />
        </HooksProvider>
    )
}
