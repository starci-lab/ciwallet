import { use } from "react"
import { useUnityContext } from "react-unity-webgl"
import { UnityContextHook } from "react-unity-webgl/distribution/types/unity-context-hook"
import { HooksContext } from "./provider.hooks"

export interface UseUnityReturn {
    unity: UnityContextHook
}

const FILE_NAME = "cifarm-build"
const BUILD_PATH = `games/${FILE_NAME}/Build`

export const _useUnity = () : UseUnityReturn => {
    const unity = useUnityContext({
        loaderUrl: `${BUILD_PATH}/${FILE_NAME}.loader.js`,
        dataUrl: `${BUILD_PATH}/${FILE_NAME}.data.unityweb`,
        frameworkUrl: `${BUILD_PATH}/${FILE_NAME}.framework.js.unityweb`,
        codeUrl: `${BUILD_PATH}/${FILE_NAME}.wasm.unityweb`,
    })
    
    return {
        unity
    }
}

export const useUnity = () => {
    const { unity } = use(HooksContext)!
    return unity
}