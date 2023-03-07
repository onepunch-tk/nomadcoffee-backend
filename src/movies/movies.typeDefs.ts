export default `#graphql
type Movie {
    id:Int!
    title:String!
    year:Int!
    genre:String
    createAt:String!
    updateAt:String!
}

type Query {
    movies: [Movie]
    movie(id:Int!):Movie
}

type Mutation {
    createMovie(title:String!, year:Int!, genre:String):Movie
    deleteMovie(id:Int!):Boolean
    updateMovie(id:Int!,year:Int!, genre:String):Movie
}
`;