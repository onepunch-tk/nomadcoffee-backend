import {UserResolvers} from "../users.type";
import client from "../../../client";
import {getErrorMessage, isMatchPassword} from "../../../common/utils";
import * as jwt from "jsonwebtoken";

const resolvers: UserResolvers = {
    Mutation: {
        login: async (_, {username, password}) => {
            try {
                const loggedInUser = await client.user.findUniqueOrThrow({where: {username}});
                if(!await isMatchPassword(password, loggedInUser.password)){
                    return {
                        result:{
                            ok:false,
                            error:"Incorrect password."
                        }
                    }
                }

                const token = jwt.sign({id:loggedInUser.id}, process.env.SECRET_KEY as string);
                return {
                    token,
                    result:{
                        ok:true
                    }
                }
            } catch (e) {
                return {
                    result:{
                        ok:false,
                        error:getErrorMessage(e)
                    }
                }
            }
        }
    }
}

export default resolvers;