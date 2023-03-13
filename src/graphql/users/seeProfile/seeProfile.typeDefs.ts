export default `#graphql
union seeProfileResult = User | Result
type Query {
    seeProfile(username:String!):seeProfileResult!
}
`;