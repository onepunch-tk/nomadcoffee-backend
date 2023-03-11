import {UserResolvers} from "../users.type"
import client from "../../../client";
import bcrypt from "bcrypt";

const resolvers: UserResolvers = {
    Mutation: {
        createAccount: async (_, userDto) => {
            console.log(userDto);
            const existsUser = await client.$transaction((tx) =>
                tx.user.findFirst({
                    where: {
                        OR: [
                            {username: userDto.username},
                            {email: userDto.email}
                        ]
                    }
                })
            );

            if (existsUser) return {
                result: {
                    ok: false,
                    error: "Already exists username or email."
                }
            }

            userDto.password = await bcrypt.hash(userDto.password, 10);
            const user = await client.user.create({
                data: {
                    ...userDto,
                }
            });

            return {
                user,
                result: {
                    ok: true
                }
            }
        }
    }
}

export default resolvers;