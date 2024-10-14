import { use } from "react"
import { useUnityContext } from "react-unity-webgl"
import { UnityContextHook } from "react-unity-webgl/distribution/types/unity-context-hook"
import { HooksContext } from "./provider.hooks"
import { envConfig } from "@/config"
import { UnityCacheControlMode } from "react-unity-webgl/distribution/types/unity-cache-control-mode"

export interface UseUnityReturn {
  unity: UnityContextHook;
}

export const VERSION = "v.1.1.a"

const gameUrl = (name: string) => {
    const isDev = envConfig().isDev
    return `${envConfig().externals.cifarm.packages.baseUrl}${!isDev ? `${VERSION}/` : "" }${name}`    
}

export const _useUnity = (): UseUnityReturn => {

    const handleCacheControl = (url: string): UnityCacheControlMode => {
        if (url.match(/\.data/) || url.match(/\.bundle/)) {
            return "must-revalidate"
        }
        if (url.match(/\.mp4/) || url.match(/\.wav/)) {
            return "immutable"
        }
        return "no-store"
    }

    const context = {
        loaderUrl: gameUrl(envConfig().externals.cifarm.packages.loaderName),
        dataUrl: gameUrl(envConfig().externals.cifarm.packages.dataName),
        frameworkUrl: gameUrl(envConfig().externals.cifarm.packages.frameworkName),
        codeUrl: gameUrl(envConfig().externals.cifarm.packages.wasmName),
        cacheControl: handleCacheControl
    }

    const unity = useUnityContext(context)

    return {
        unity,
    }
}

export const useUnity = () => {
    const { unity } = use(HooksContext)!
    return unity
}
