export default `#graphql
type LoginResult {
    token:String
    result:Result!
}

type Mutation {
    login(
        username:String!,
        password:String!
    ):LoginResult!
}
`;