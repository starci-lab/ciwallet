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
        },
    },
    appSalt: process.env.APP_SALT,
})