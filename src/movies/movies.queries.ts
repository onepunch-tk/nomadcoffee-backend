import client from "../client";
import {IMovie} from "./movies.interfaces";
export default {
    Query: {
        movies: async () => await client.movie.findMany(),
        movie: async (_, {id}: IMovie) => await client.movie.findUnique({
            where: {
                id
            }
        })
    }
}