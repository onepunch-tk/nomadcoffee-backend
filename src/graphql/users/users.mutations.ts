import {IUserDto} from "../../common/dto";
import client from "../../client";
import bcrypt from "bcrypt"

export default {
    Mutation: {
        createAccount: async (_: any, userDto: IUserDto) => {
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
                ok:false,
                error:"Already exists username or email."
            }

            userDto.password = await bcrypt.hash(userDto.password, 10);
            const createdUser = await client.user.create({
                data:{
                    ...userDto,
                }
            });

            return {
                user:createdUser,
                ok:true
            }
        }
    }
}