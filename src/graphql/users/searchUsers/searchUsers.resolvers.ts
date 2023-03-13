import {UserResolvers} from "../users.type";

const resolvers: UserResolvers = {
    Query: {
        searchUsers: async (root, {keyword,lastId}, {client}, info) => {
            console.log("search");
            return client.user.findMany({
                where:{
                    username:{
                        startsWith:keyword.toLowerCase()
                    }
                },
                skip:lastId ? 1 : 0,
                take:5,
                ...(lastId && {
                    cursor:{
                        id:lastId
                    }
                })
            });
        }
    }
};

export default resolvers;