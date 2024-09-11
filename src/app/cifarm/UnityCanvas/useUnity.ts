import { use } from "react"
import { useUnityContext } from "react-unity-webgl"
import { UnityContextHook } from "react-unity-webgl/distribution/types/unity-context-hook"
import { HooksContext } from "./provider.hooks"
import { envConfig } from "@/config"

export interface UseUnityReturn {
    unity: UnityContextHook
}

export const _useUnity = () : UseUnityReturn => {
    const unity = useUnityContext({
        loaderUrl: envConfig().externals.cifarm.packages.loaderUrl,
        dataUrl: envConfig().externals.cifarm.packages.dataUrl,
        frameworkUrl: envConfig().externals.cifarm.packages.frameworkUrl,
        codeUrl: envConfig().externals.cifarm.packages.wasmUrl,
    })
    
    return {
        unity
    }
}

export const useUnity = () => {
    const { unity } = use(HooksContext)!
    return unity
}