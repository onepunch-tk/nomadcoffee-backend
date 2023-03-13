import path from "path";

require("dotenv").config();
import {IContext} from "./graphql/users/users.type";
import {ApolloServer} from '@apollo/server';
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";
import {expressMiddleware} from "@apollo/server/express4";
import {ApolloServerPluginDrainHttpServer} from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import {json} from "body-parser";
import {startStandaloneServer} from '@apollo/server/standalone';
import schema from "./graphql/schema";
import cors from 'cors';
import client from "./client";
import {getUser} from "./graphql/users/users.utils";
import logger from "morgan";

const PORT =Number(process.env.PORT);

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer<IContext>({
    schema,
    plugins:[ApolloServerPluginDrainHttpServer({httpServer})],
});


(async () => {
    await server.start();
    app.use(logger("tiny"));
    app.use("/uploads",express.static(path.join(process.cwd(),"uploads")));
    app.use(
        '/graphql',
        cors<cors.CorsRequest>(),
        json(),
        graphqlUploadExpress({
            maxFileSize:10000000,
            maxFiles:20
        }),
        expressMiddleware(server, {
            context: async ({ req }) => ({
                loggedInUser: await getUser(req.headers.authorization??""),
                client
            }),
        })
    );

    await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
})();



