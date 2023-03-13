import {UserResolver, UserResolvers} from "../users.type";
import {protectResolver} from "../users.utils";

const SeeProfileFn: UserResolver = async (root, {username}, context, info) =>
    await context.client.user.findUnique({where: {username}});

const resolvers: UserResolvers = {
    seeProfileResult: {
        __resolveType(obj) {
            if ("ok" in obj) {
                return "Result";
            }

            return "User";
        }
    },
    Query: {
        seeProfile: protectResolver(SeeProfileFn)
    }
}

export default resolvers;