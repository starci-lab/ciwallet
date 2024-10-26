import { Dexie, EntityTable } from "dexie"
import { useBase } from "."
import { usePathname } from "next/navigation"
import axios from "axios"
import { constantConfig, envConfig } from "@/config"
import useSWR, { SWRResponse } from "swr"
import { useEffect, useState } from "react"

type UseCifarmDbSwr = SWRResponse<
  string,
  unknown,
  {
    revalidateOnFocus: false;
    revalidateOnReconnect: false;
    revalidateIfStale: false;
    revalidateOnMount: false;
  }
>;

export interface UseCifarmDbReturn {
  //db
  cifarmDb: CifarmDb;
  //swrs
  dataSwr: UseCifarmDbSwr;
  frameworkSwr: UseCifarmDbSwr;
  loaderSwr: UseCifarmDbSwr;
  wasmSwr: UseCifarmDbSwr;
  //finish load
  loaded: boolean;
  downloaded: number;
}

const VERSION = 1
const RESOURCE_VERSION = `v.${VERSION}.7.a`

const gameUrl = (name: string) => {
    const isDev = envConfig().isDev
    return `${envConfig().externals.cifarm.packages.baseUrl}${!isDev ? `${RESOURCE_VERSION}/` : ""}${name}`
}

export const _useCifarmDb = (): UseCifarmDbReturn => {
    const cifarmDb = new CifarmDb()
    const pathname = usePathname()

    const [finishOpen, setFinishOpen] = useState(false)
    useEffect(() => {
        const handleEffect = async () => {
            await cifarmDb.open()
            setFinishOpen(true)
        }
        handleEffect()
    }, [])

    const [dataDownloaded, setDataDownloaded] = useState(0)
    const [frameworkDownloaded, setFrameworkDownloaded] = useState(0)
    const [loaderDownloaded, setLoaderDownloaded] = useState(0)
    const [wasmDownloaded, setWasmDownloaded] = useState(0)

    const createPackageBlobUrl = async (name: CifarmPackageName) => {
        if (pathname !== constantConfig().path.cifarm) return ""
        await cifarmDb.open()
        const resourceUrl = gameUrl(envConfig().externals.cifarm.packages[name])
        const { key } = mapPackageNameToKey[name]

        let blob: Blob
        const value = await cifarmDb.packages.get(key)
        if (!value) {
            const { data } = await axios.get(resourceUrl, {
                responseType: "blob",
                onDownloadProgress: (progressEvent) => {
                    switch (name) {
                    case CifarmPackageName.Data:
                        setDataDownloaded(
                            progressEvent.loaded / (progressEvent.total || 1)
                        )
                        break
                    case CifarmPackageName.Framework:
                        setFrameworkDownloaded(
                            progressEvent.loaded / (progressEvent.total || 1)
                        )
                        break
                    case CifarmPackageName.Loader:
                        setLoaderDownloaded(
                            progressEvent.loaded / (progressEvent.total || 1)
                        )
                        break
                    case CifarmPackageName.Wasm:
                        setWasmDownloaded(
                            progressEvent.loaded / (progressEvent.total || 1)
                        )
                        break
                    }
                },
            })
            blob = data
            await cifarmDb.packages.add({ name: key, value: data })
        } else {
            blob = value.value
        }
        return URL.createObjectURL(blob)
    }

    const dataSwr = useSWR(
        finishOpen ? ["CIFARM_DATA", pathname] : null,
        () => createPackageBlobUrl(CifarmPackageName.Data),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            revalidateIfStale: false,
            revalidateOnMount: false,
        }
    )
    const frameworkSwr = useSWR(
        finishOpen ? ["CIFARM_FRAMEWORK", pathname] : null,
        () => createPackageBlobUrl(CifarmPackageName.Framework),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            revalidateIfStale: false,
            revalidateOnMount: false,
        }
    )
    const loaderSwr = useSWR(
        finishOpen ? ["CIFARM_LOADER", pathname] : null,
        () => createPackageBlobUrl(CifarmPackageName.Loader),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            revalidateIfStale: false,
            revalidateOnMount: false,
        }
    )
    const wasmSwr = useSWR(
        finishOpen ? ["CIFARM_WASM", pathname] : null,
        () => createPackageBlobUrl(CifarmPackageName.Wasm),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            revalidateIfStale: false,
            revalidateOnMount: false,
        }
    )

    const loaded =
    !!dataSwr.data && !!frameworkSwr.data && !!loaderSwr.data && !!wasmSwr.data
    useEffect(() => {
        if (!loaded) return
        cifarmDb.close()
    }, [loaded])

    return {
        cifarmDb,
        dataSwr,
        frameworkSwr,
        loaderSwr,
        wasmSwr,
        loaded,
        downloaded: Math.max(
            dataDownloaded,
            frameworkDownloaded,
            loaderDownloaded,
            wasmDownloaded
        ),
    }
}

export const useCifarmDb = () => {
    const { cifarmDb } = useBase()
    return cifarmDb
}

export interface PackageEntity {
  name: string;
  value: Blob;
}

export class CifarmDb extends Dexie {
    packages!: EntityTable<PackageEntity, "name">

    constructor() {
        super("cifarm")
        this.version(VERSION).stores({
            packages: "name, value",
        })
    }
}

export enum CifarmPackageName {
  Data = "dataName",
  Framework = "frameworkName",
  Loader = "loaderName",
  Wasm = "wasmName",
}

export enum CifarmPackageKey {
  Data = "data",
  Framework = "framework",
  Loader = "loader",
  Wasm = "wasm",
}

export interface CifarmPackageData {
  key: CifarmPackageKey;
}

const mapPackageNameToKey: Record<CifarmPackageName, CifarmPackageData> = {
    [CifarmPackageName.Data]: {
        key: CifarmPackageKey.Data,
    },
    [CifarmPackageName.Framework]: {
        key: CifarmPackageKey.Framework,
    },
    [CifarmPackageName.Loader]: {
        key: CifarmPackageKey.Loader,
    },
    [CifarmPackageName.Wasm]: {
        key: CifarmPackageKey.Wasm,
    },
}
