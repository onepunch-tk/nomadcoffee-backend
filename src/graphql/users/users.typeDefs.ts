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

type Result {
    ok:Boolean!
    error:String
}

type Query {
    hello:String
}

`;