export default ` #graphql
type User {
    username:String!
    email:String!
    name:String
    location:String
    avatarURL:String
    githubUsername:String
    createAt:String!
    updateAt:String!
}

type CreateResult {
    user:User
    ok:Boolean!
    error:String
}

type Mutation {
    createAccount(
        username:String!,
        email:String!,
        name:String,
        location:String,
        avatarURL:String,
        githubUsername:String,
        password:String
    ):CreateResult
}

type Query {
    hello:String
}
`;