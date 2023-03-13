export default `#graphql
type CreateResult {
    user:User
    result:Result!
}

type Mutation {
    createAccount(
        username:String!,
        email:String!,
        name:String,
        location:String,
        avatarURL:String,
        githubUsername:String,
        password:String!
    ):CreateResult
}
`;
