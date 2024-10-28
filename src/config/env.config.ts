export const envConfig = () => ({
    isDev: process.env.NODE_ENV !== "production",
    defaultTelegramInitDataRaw: process.env.NEXT_PUBLIC_DEFAULT_TELEGRAM_INIT_DATA_RAW || "",
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
                baseUrl: process.env.NEXT_PUBLIC_CIFARM_BASE_URL,
                loaderName: process.env.NEXT_PUBLIC_CIFARM_LOADER_NAME ?? "",
                dataName: process.env.NEXT_PUBLIC_CIFARM_DATA_NAME ?? "",
                frameworkName: process.env.NEXT_PUBLIC_CIFARM_FRAMEWORK_NAME ?? "",
                wasmName: process.env.NEXT_PUBLIC_CIFARM_WASM_NAME ?? ""
            }
        },
    },
    appSalt: process.env.APP_SALT,
})