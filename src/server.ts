require("dotenv").config();
import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';
import schema from "./schema";

const server = new ApolloServer({
    schema
});

const PORT = process.env.PORT;

(async () => {
    const {url} = await startStandaloneServer(server, {
        listen: {port:Number(PORT)},
    });
    console.log(`🚀  Server ready at: ${url}`);
})();



