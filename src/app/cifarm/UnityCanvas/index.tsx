import { useUnity } from "./useUnity"
import { Unity } from "react-unity-webgl"
import React from "react"
import { HooksProvider } from "./provider.hooks"

export const WrappedUnityCanvas = () => {
    const {
        unity: { unityProvider },
    } = useUnity()

    return (
        <div className="w-full h-full">
            <Unity
                className="w-full h-full"
                devicePixelRatio={1}
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
