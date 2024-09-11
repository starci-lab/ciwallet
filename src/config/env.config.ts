export const envConfig = () => ({
    externals: {
        cifarm: {
            core: {
                key: process.env.NEXT_PUBLIC_CIFARM_CORE_KEY,
                host: process.env.NEXT_PUBLIC_CIFARM_CORE_HOST,
                port: process.env.NEXT_PUBLIC_CIFARM_CORE_PORT,
                useSsl: process.env.NEXT_PUBLIC_CIFARM_CORE_USE_SSL === "true",
            },
            periphery: {
                api: process.env.NEXT_PUBLIC_CIFARM_PERIPHERY_API_URL,
                graphql: process.env.NEXT_PUBLIC_CIFARM_PERIPHERY_GRAPHQL_URL,
            },
            packages: {
                loaderUrl: process.env.NEXT_PUBLIC_CIFARM_LOADER_URL ?? "",
                dataUrl: process.env.NEXT_PUBLIC_CIFARM_DATA_URL ?? "",
                frameworkUrl: process.env.NEXT_PUBLIC_CIFARM_FRAMEWORK_URL ?? "",
                wasmUrl: process.env.NEXT_PUBLIC_CIFARM_WASM_URL ?? ""
            }
        },
    },
    appSalt: process.env.APP_SALT,
})