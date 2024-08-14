
import { envConfig } from "@/config"
import {
    ApolloClient,
    DefaultOptions,
    InMemoryCache,
    createHttpLink,
    from,
} from "@apollo/client"

const defaultOptions: DefaultOptions = {
    watchQuery: {
        fetchPolicy: "no-cache",
        errorPolicy: "all",
    },
    query: {
        fetchPolicy: "no-cache",
        errorPolicy: "all",
    },
}

const httpLink = createHttpLink({
    uri: envConfig().urls.backend.graphql,
})

export const client = new ApolloClient({
    link: from([httpLink]),
    cache: new InMemoryCache(),
    defaultOptions,
})
