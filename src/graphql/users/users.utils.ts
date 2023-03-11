import {User} from "@prisma/client";
import client from "../../client";
import jwt from "jsonwebtoken";
import {UserResolver} from "./users.type";

export const getUser = async (token: string): Promise<User | null> => {
    try {
        if(!token){
            return null;
        }
        const {id} = await jwt.verify(token,process.env.SECRET_KEY as string) as {id:number};
        return client.user.findUniqueOrThrow({where: {id}});
    } catch {
        return null;
    }
}

export const protectResolver= (ourResolver:UserResolver):UserResolver => (root, user, context, info) => {
    if(!context.loggedInUser) {
        return {
            result:{
                ok:false,
                error:"Please log in to perform this action."
            }
        }
    }

    return ourResolver(root,user,context,info);
}