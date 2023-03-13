import {UserResolver, UserResolvers} from "../users.type";
import {protectResolver} from "../users.utils";
import {getErrorMessage} from "../../../common/utils";

const unfollowFn:UserResolver = async (root, {username}, {client,loggedInUser}, info)=>{
    try {
        const findUser = await client.user.findUniqueOrThrow({
            where:{
                username
            },
        });
        await client.user.update({
            where:{
                id:loggedInUser?.id
            },
            data:{
                followings:{
                    disconnect:{
                        id:findUser.id
                    }
                }
            }
        });

        return {
            ok:true
        }
    } catch (e) {
        return {
            ok:false,
            error:getErrorMessage(e)
        }
    }
}

const resolvers:UserResolvers = {
    Mutation:{
        unfollowUser:protectResolver(unfollowFn)
    }
}

export default resolvers;