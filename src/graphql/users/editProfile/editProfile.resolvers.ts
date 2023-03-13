import {UserResolver, UserResolvers} from "../users.type";
import {protectResolver} from "../users.utils";
import {createWriteStream, ReadStream} from "fs";
import {getPasswordHash} from "../../../common/utils";

const editProfileFn: UserResolver = async (root, user, {loggedInUser,client}, info) => {
    if (user.avatar) {
        const {filename, createReadStream}: { filename: string, createReadStream: () => ReadStream } =
            await user.avatar.promise;
        const readStream = createReadStream();
        const writeStream = createWriteStream(`${process.cwd()}/uploads/${filename}`);
        readStream.pipe(writeStream);
        user.avatar = `http://localhost:4000/uploads/${filename}`;
    }

    if(user.password) {
        user.password = await getPasswordHash(user.password);
    }

    await client.user.update({
        where:{
            id:loggedInUser?.id
        },
        data:{
            ...user
        }
    });

    return {
        ok:true,
    }
};

const resolvers: UserResolvers = {
    Mutation: {
        editProfile: protectResolver(editProfileFn)
    }
};

export default resolvers;