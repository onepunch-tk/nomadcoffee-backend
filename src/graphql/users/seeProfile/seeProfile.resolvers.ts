import {UserResolver, UserResolvers} from "../users.type";

const SeeProfileFn: UserResolver = async (root, {username, followingPage, lastId}, {client}, info) => {
    const user = await client.user.findUnique({
        where: {
            username
        },
        include: {
            ...(followingPage ? {
                followings: {
                    skip: (followingPage - 1) * 5,
                    take: 5
                }
            } : {followings: false}),
            ...(lastId ? {
                followers: {
                    skip: lastId ? 1 : 0,
                    take: 10,
                    cursor: {
                        id: lastId
                    }
                }
            } : {followers: false})
        }
    });
    return user;
}

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
        seeProfile: SeeProfileFn
    },
    User: {
        totalPage: async ({username}, user, {client}) => {
            const count = await client.user.count({
                where: {
                    followers: {
                        some: {
                            username
                        }
                    }
                },
            });
            return Math.ceil(count / 5);
        },
        isMe: ({id}, _, {loggedInUser}) => loggedInUser?.id === id,
        isFollowing: async ({id}, _, {client, loggedInUser}) => {
            try {
                const exist = await client.user.findUniqueOrThrow({
                    where: {
                        id
                    }
                }).followers({
                    where: {
                        id: loggedInUser?.id
                    }
                });
                return exist.length > 0
            } catch {
                return false;
            }
        }
    }
}

export default resolvers;

