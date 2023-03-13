export default `#graphql
scalar Upload
type Mutation {
    editProfile(
        name:String,
        location:String,
        avatar:Upload,
        githubUsername:String,
        password:String
    ):Result
}
`;