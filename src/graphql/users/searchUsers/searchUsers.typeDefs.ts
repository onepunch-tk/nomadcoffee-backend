export default `#graphql
type Query {
    searchUsers(keyword:String!, lastId:Int):[User!]
}
`;