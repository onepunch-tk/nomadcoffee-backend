import {PrismaClient, User} from "@prisma/client";
import {BaseContext} from "@apollo/server";
import {GraphQLResolveInfo} from "graphql/type";

export interface IContext extends BaseContext{
    loggedInUser:User|null;
    client:PrismaClient;
}
export interface IUserDto {
    username:string;
    email:string;
    name:string;
    location:string;
    avatar:any;
    githubUsername:string;
    password:string;
    followingPage:number;
    lastId:number;
    keyword:string;
}
export type UserResolver = (root:any, user:IUserDto, context:IContext, info:GraphQLResolveInfo) => any
export type UserResolvers = {
    [key: string]: {
        [key: string]: UserResolver
    }
}