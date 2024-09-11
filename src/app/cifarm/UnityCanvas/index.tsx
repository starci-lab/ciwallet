import { useUnity } from "./useUnity"
import { Unity } from "react-unity-webgl"
import React from "react"
import { HooksProvider } from "./provider.hooks"
import { Spinner } from "@nextui-org/react"

export const WrappedUnityCanvas = () => {
    const {
        unity: { unityProvider, isLoaded },
    } = useUnity()

    return (
        <div className="w-full h-full relative">
            {!isLoaded ? (
                <div className="w-full h-full absolute place-items-center grid">
                    <Spinner size="lg" label="Loading..." />
                </div>
            ) : null}

            <Unity
                className="w-full h-full"
                devicePixelRatio={window.devicePixelRatio}
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
