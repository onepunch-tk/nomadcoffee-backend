import {User} from "@prisma/client";
import client from "../../client";
import jwt from "jsonwebtoken";

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