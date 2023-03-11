import {IContext} from "./graphql/users/users.type";

require("dotenv").config();
import {ApolloServer} from '@apollo/server';
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

const PORT = process.env.PORT;

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer<IContext>({
    schema,
    plugins:[ApolloServerPluginDrainHttpServer({httpServer})]
});



(async () => {
    await server.start();
    app.use(
        '/graphql',
        cors<cors.CorsRequest>(),
        json(),
        expressMiddleware(server, {
            context: async ({ req }) => ({
                loggedInUser: await getUser(req.headers.authorization??""),
                client
            }),
        })
    )
})();



