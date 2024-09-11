import { useUnity } from "./useUnity"
import { Unity } from "react-unity-webgl"
import React, { useEffect, useState } from "react"
import { HooksProvider } from "./provider.hooks"
import { Spinner } from "@nextui-org/react"

export const WrappedUnityCanvas = () => {
    const {
        unity: { unityProvider, isLoaded },
    } = useUnity()

    const [devicePixelRatio, setDevicePixelRatio] = useState(
        window.devicePixelRatio
    )

    useEffect(
        () => {
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
        },
        [devicePixelRatio]
    )
    

    return (
        <div className="w-full h-full relative">
            {!isLoaded ? (
                <div className="w-full h-full absolute place-items-center grid">
                    <Spinner size="lg" label="Loading..." />
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
