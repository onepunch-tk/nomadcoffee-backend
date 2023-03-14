import {IUserDto, UserResolver, UserResolvers} from "../users.type";

const SeeProfileFn: UserResolver = async (root, {username, followingPage, lastId}, {client}, info) => {
    const user = await client.user.findUnique({
        where: {
            username
        },
    });
    return user;
}

interface A {
    username: string;
    lastId:number;
    followingPage:number
}

type Types = "string" | "number" | "boolean";
function asA(data: unknown): A {
    const keyValidators: Record<keyof A, Types> = {
        followingPage: "number",
        lastId: "number",
        username: "string"
    }
    if (typeof data === 'object' && data !== null) {
        let maybeA = data as A;
        for (const key of Object.keys(keyValidators) as Array<keyof A>) {
            if (typeof maybeA[key] !== keyValidators[key]) {
                throw new Error('data is not an A');
            }
        }
        return maybeA;
    }
    throw new Error('data is not an A');
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
        seeProfile: SeeProfileFn,

    },
    User: {
        followings: async ({id}, _, {client}, {variableValues}) => {
            /*offset pagination*/
            const {username, followingPage} = variableValues;
            return client.user.findMany({
                where: {
                    followers: {
                        some: {
                            username: username as string,
                        },
                    },
                },
                skip: (followingPage as number - 1) * 5,
                take: 5
            })
        },
        followers: async ({id}, _, {client}, {variableValues}) => {
            /*cursor-based pagination*/
           const {lastId,username} = asA(variableValues);
            return client.user.findMany({
                where: {
                    followings: {
                        some: {
                            username
                        },
                    },
                },
                skip: lastId ? 1 : 0,
                take: 5,
                ...(lastId && {cursor: {id: lastId}})
            })
        },
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

