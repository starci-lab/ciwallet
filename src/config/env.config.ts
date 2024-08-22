export const envConfig = () => ({
    urls: {
        backend: {
            api: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`,
            graphql: `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`
        }
    },
    appSalt: process.env.APP_SALT
})