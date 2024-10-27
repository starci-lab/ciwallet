import { Dexie, EntityTable } from "dexie"
import { useBase } from "."
import { usePathname } from "next/navigation"
import axios, { AxiosProgressEvent } from "axios"
import { constantConfig, envConfig } from "@/config"
import useSWR, { SWRResponse } from "swr"
import { useEffect, useState } from "react"
import {
    GamePeripheryApiService,
    loadGameVersion,
    saveGameVersion,
} from "@/services"

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

export interface Package {
  //swr indice the fetch process
  swr: UseCifarmDbSwr;
  //state
  state: PackageState;
}

export interface PackageState {
  progress: AxiosProgressEvent | null;
  //downloaded
  totalChunks: number;
  downloadedChunks: number;
  //total size
  totalSize: number;
  //finish load
  finishDownloaded: boolean;
}

export interface UseCifarmDbReturn {
  //db
  cifarmDb: CifarmDb;
  //data
  data: Package;
  framework: Package;
  loader: Package;
  wasm: Package;
  //finish download
  finishDownloaded: boolean;
}

const VERSION = 1
const RESOURCE_VERSION = `v.${VERSION}.7.a`
const CHUNK_SIZE = 1024 * 1024 * 3 // 3MB

export interface DownloadChunkParams {
  key: string;
  resourceUrl: string;
  index: number;
  //content length to ensure last chunk
  start: number;
  end: number;
}

const gameUrl = (name: string) => {
    const isDev = envConfig().isDev
    return `${envConfig().externals.cifarm.packages.baseUrl}${!isDev ? `${RESOURCE_VERSION}/` : ""}${name}`
}

export const _useCifarmDb = (): UseCifarmDbReturn => {
    const cifarmDb = new CifarmDb()
    const pathname = usePathname()

    const [needUpdate, setNeedUpdate] = useState(false)
    const [finishOpen, setFinishOpen] = useState(false)

    useEffect(() => {
        const handleEffect = async () => {
            //check version
            const api = new GamePeripheryApiService()
            const { version } = await api.getGameVersion()

            //retrive in local storage
            const storedGameVersion = loadGameVersion()
            if (!storedGameVersion || storedGameVersion !== version) {
                //save in local storage
                setNeedUpdate(true)
                saveGameVersion(version)
            }
            await cifarmDb.open()
            setFinishOpen(true)
        }
        handleEffect()
    }, [])

    const defaultState: PackageState = {
        progress: null,
        totalChunks: 0,
        downloadedChunks: 0,
        totalSize: 0,
        finishDownloaded: false,
    }

    const [dataState, setDataState] = useState<PackageState>(defaultState)
    const [frameworkState, setFrameworkState] =
    useState<PackageState>(defaultState)
    const [loaderState, setLoaderState] = useState<PackageState>(defaultState)
    const [wasmState, setWasmState] = useState<PackageState>(defaultState)

    const setFinishDownloaded = (key: CifarmPackageKey) => {
        switch (key) {
        case CifarmPackageKey.Data: {
            setDataState({
                ...dataState,
                finishDownloaded: true,
            })
            break
        }
        case CifarmPackageKey.Framework: {
            setFrameworkState({
                ...frameworkState,
                finishDownloaded: true,
            })
            break
        }
        case CifarmPackageKey.Loader: {
            setLoaderState({
                ...loaderState,
                finishDownloaded: true,
            })
            break
        }
        case CifarmPackageKey.Wasm: {
            setWasmState({
                ...wasmState,
                finishDownloaded: true,
            })
            break
        }
        }
    }

    const downloadChunk = async ({
        key,
        resourceUrl,
        index,
        start,
        end,
    }: DownloadChunkParams) => {
        try {
            const { data } = await axios.get(resourceUrl, {
                responseType: "arraybuffer",
                headers: {
                    "Cache-Control": "no-cache",
                    Range: `bytes=${start}-${end}`,
                },
                onDownloadProgress: (progressEvent) => {
                    switch (key) {
                    case CifarmPackageKey.Data: {
                        setDataState({
                            ...dataState,
                            downloadedChunks: index + 1,
                            progress: progressEvent,
                        })
                        break
                    }
                    case CifarmPackageKey.Framework: {
                        setFrameworkState({
                            ...frameworkState,
                            downloadedChunks: index + 1,
                            progress: progressEvent,
                        })
                        break
                    }
                    case CifarmPackageKey.Loader: {
                        setLoaderState({
                            ...loaderState,
                            downloadedChunks: index + 1,
                            progress: progressEvent,
                        })
                        break
                    }
                    case CifarmPackageKey.Wasm: {
                        setWasmState({
                            ...wasmState,
                            downloadedChunks: index + 1,
                            progress: progressEvent,
                        })
                        break
                    }
                    }
                },
            })
            await cifarmDb.chunks.add({
                chunk_index: index,
                package_key: key,
                chunk_data: data,
            })
        } catch (ex) {
            console.error(ex)
            //do nothing, just skip
        }
    }

    //super function, continue download, save in db
    const createPackageBlobUrl = async (key: CifarmPackageKey) => {
        if (pathname !== constantConfig().path.cifarm) return ""
        const { name } = packageMap[key]
        const resourceUrl = gameUrl(envConfig().externals.cifarm.packages[name])

        const _package = await cifarmDb.packages.get(key)
        if (_package) {
            //found in db, mean that is have been downloaded, either fully or partially
            if (needUpdate) {
                //if need update, we need to re-download
                await cifarmDb.packages.where({ key }).delete()
                await cifarmDb.chunks.where({ package_key: key }).delete()
            } else {
                const chunks = await cifarmDb.chunks
                    .where({
                        package_key: key,
                    })
                    .toArray()
                if (!chunks) throw new Error("Chunks not found")
                if (chunks.length === _package.total_chunks) {
                    //all chunks are downloaded
                    const blob = new Blob(chunks.map((chunk) => chunk.chunk_data))

                    //finish
                    setFinishDownloaded(key)
                    return URL.createObjectURL(blob)
                }
                const startChunk = chunks.length //start from the last chunk
                for (let index = startChunk; index < _package.total_chunks; index++) {
                    const start = index * CHUNK_SIZE
                    const end = Math.min(
                        (index + 1) * CHUNK_SIZE,
                        _package.total_size - 1
                    )
                    await downloadChunk({ key, resourceUrl, start, end, index })
                }
                const newChunks = await cifarmDb.chunks
                    .where({ package_key: key })
                    .toArray()
                const blob = new Blob(newChunks.map((chunk) => chunk.chunk_data))

                setFinishDownloaded(key)
                return URL.createObjectURL(blob)
            }
        }

        //re-download everything
        const { headers } = await axios.head(resourceUrl, {
            headers: {
                "Cache-Control": "no-cache",
            },
        })
        const contentLength = headers["content-length"]
        if (!contentLength) throw new Error("Content-Length not found")
        const totalChunks = Math.ceil(contentLength / CHUNK_SIZE)
        //save
        switch (key) {
        case CifarmPackageKey.Data: {
            setDataState({
                ...dataState,
                totalChunks,
                totalSize: contentLength,
            })
            break
        }
        case CifarmPackageKey.Framework: {
            setFrameworkState({
                ...frameworkState,
                totalChunks,
                totalSize: contentLength,
            })
            break
        }
        case CifarmPackageKey.Loader: {
            setLoaderState({
                ...loaderState,
                totalChunks,
                totalSize: contentLength,
            })
            break
        }
        case CifarmPackageKey.Wasm: {
            setWasmState({
                ...wasmState,
                totalChunks,
                totalSize: contentLength,
            })
            break
        }
        }

        await cifarmDb.packages.add({
            key,
            total_chunks: totalChunks,
            total_size: contentLength,
        })

        //download all chunks
        for (let index = 0; index < totalChunks; index++) {
            const start = index * CHUNK_SIZE
            const end = Math.min((index + 1) * CHUNK_SIZE, contentLength - 1)
            await downloadChunk({ key, resourceUrl, start, end, index })
        }

        //get all chunks
        const chunks = await cifarmDb.chunks
            .where({
                package_key: key,
            })
            .toArray()

        const blob = new Blob(chunks.map((chunk) => chunk.chunk_data))

        setFinishDownloaded(key)
        return URL.createObjectURL(blob)
    }

    const dataSwr = useSWR(
        finishOpen ? ["CIFARM_DATA", pathname] : null,
        () => createPackageBlobUrl(CifarmPackageKey.Data),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            revalidateIfStale: false,
            revalidateOnMount: false,
        }
    )
    const frameworkSwr = useSWR(
        finishOpen ? ["CIFARM_FRAMEWORK", pathname] : null,
        () => createPackageBlobUrl(CifarmPackageKey.Framework),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            revalidateIfStale: false,
            revalidateOnMount: false,
        }
    )
    const loaderSwr = useSWR(
        finishOpen ? ["CIFARM_LOADER", pathname] : null,
        () => createPackageBlobUrl(CifarmPackageKey.Loader),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            revalidateIfStale: false,
            revalidateOnMount: false,
        }
    )
    const wasmSwr = useSWR(
        finishOpen ? ["CIFARM_WASM", pathname] : null,
        () => createPackageBlobUrl(CifarmPackageKey.Wasm),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            revalidateIfStale: false,
            revalidateOnMount: false,
        }
    )

    const finishDownloaded =
    !!dataSwr.data && !!frameworkSwr.data && !!loaderSwr.data && !!wasmSwr.data

    useEffect(() => {
        if (!finishDownloaded) return
        cifarmDb.close()
    }, [finishDownloaded])

    return {
        cifarmDb,
        data: {
            swr: dataSwr,
            state: dataState,
        },
        framework: {
            swr: frameworkSwr,
            state: frameworkState,
        },
        loader: {
            swr: loaderSwr,
            state: loaderState,
        },
        wasm: {
            swr: wasmSwr,
            state: wasmState,
        },
        finishDownloaded,
    }
}

export const useCifarmDb = () => {
    const { cifarmDb } = useBase()
    return cifarmDb
}

export interface PackageEntity {
  key: string;
  total_chunks: number;
  total_size: number;
}

export interface ChunkEntity {
  id?: number;
  chunk_index: number;
  package_key: string;
  chunk_data: ArrayBuffer;
}

export class CifarmDb extends Dexie {
    packages!: EntityTable<PackageEntity, "key">
    chunks!: EntityTable<ChunkEntity, "chunk_index">

    constructor() {
        super("cifarm")
        this.version(VERSION).stores({
            packages: "key, total_chunks, total_size",
            chunks: "++id, chunk_index, package_key, chunk_data",
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
  name: CifarmPackageName;
}

const packageMap: Record<CifarmPackageKey, CifarmPackageData> = {
    [CifarmPackageKey.Data]: {
        name: CifarmPackageName.Data,
    },
    [CifarmPackageKey.Framework]: {
        name: CifarmPackageName.Framework,
    },
    [CifarmPackageKey.Loader]: {
        name: CifarmPackageName.Loader,
    },
    [CifarmPackageKey.Wasm]: {
        name: CifarmPackageName.Wasm,
    },
}
