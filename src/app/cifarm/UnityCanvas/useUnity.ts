import { use } from "react"
import { useUnityContext } from "react-unity-webgl"
import { UnityContextHook } from "react-unity-webgl/distribution/types/unity-context-hook"
import { HooksContext } from "./provider.hooks"
import { envConfig } from "@/config"
import { UnityCacheControlMode } from "react-unity-webgl/distribution/types/unity-cache-control-mode"

export interface UseUnityReturn {
  unity: UnityContextHook;
}

export const VERSION = "a.1.0"
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

    const unity = useUnityContext({
        loaderUrl:`${envConfig().externals.cifarm.packages.loaderUrl}_${VERSION}`,
        dataUrl: `${envConfig().externals.cifarm.packages.dataUrl}_${VERSION}`,
        frameworkUrl: `${envConfig().externals.cifarm.packages.frameworkUrl}_${VERSION}`,
        codeUrl: `${envConfig().externals.cifarm.packages.wasmUrl}_${VERSION}`,
        cacheControl: handleCacheControl
    })

    return {
        unity,
    }
}

export const useUnity = () => {
    const { unity } = use(HooksContext)!
    return unity
}
