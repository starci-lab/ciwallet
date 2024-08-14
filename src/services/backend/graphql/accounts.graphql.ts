import { gql } from "@apollo/client"
import { GraphQLParams, buildPayloadString } from "./builder.graphql"
import { client } from "./client.graphql"
import { DeepPartial } from "@apollo/client/utilities"
import { AccountPostgresEntity } from "@/types"

export interface GetAccountInput {
  public_key?: string;
  aptos_address?: string;
}

export type LoadParams = GraphQLParams<GetAccountInput, AccountPostgresEntity>;

export const getAccount = async ({
    input,
    schema,
}: LoadParams): Promise<DeepPartial<AccountPostgresEntity>> => {
    const payload = buildPayloadString(schema)
    const { data } = await client.query({
        query: gql`
            query Account($input: GetAccountInput!) {
  account(input: $input) {
        ${payload}
    }
  }
          `,
        variables: {
            input,
        },
    })

    return data.account
}
