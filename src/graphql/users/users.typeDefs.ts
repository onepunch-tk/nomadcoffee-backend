export default ` #graphql
type User {
    username:String!
    email:String!
    name:String
    location:String
    avatar:String
    githubUsername:String
    createAt:String!
    updateAt:String!
    followers:[User!]
    followings:[User!]
    totalPage:Int!
    id:Int!
    isMe:Boolean!
    isFollowing:Boolean!
}

type Result {
    ok:Boolean!
    error:String
}

`;