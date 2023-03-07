import client from "../client";
import {IMovie} from "./movies.interfaces";
export default {
    Mutation: {
        createMovie: async (_, {title, year, genre}: IMovie) => await client.movie.create({
            data: {
                title,
                year,
                genre
            }
        }),
        deleteMovie: async (_, {id}: IMovie) => {
            try {
                const result = await client.movie.delete({
                    where: {
                        id
                    }
                });
                return result && true;
            } catch (e) {
                return false;
            }
        },
        updateMovie: async (_, {id, year, genre}: IMovie) => {
            try {
                const result = await client.movie.update({
                    where: {
                        id
                    },
                    data: {
                        year,
                        genre
                    }
                });
                return result
            } catch (e) {
                return null;
            }
        }
    },
}