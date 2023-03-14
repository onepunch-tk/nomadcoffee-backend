export default `#graphql
union seeProfileResult = User | Result
type Query {
    seeProfile(username:String!, followingPage:Int, lastId:Int):User!
}
`;