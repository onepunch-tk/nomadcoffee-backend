export interface IUserDto {
    username:string,
    email:string,
    name:string,
    location:string,
    avatarURL:any,
    githubUsername:string,
    password:string
}
export type UserResolver = (root:any, user:IUserDto, context:any, info:any) => any
export type UserResolvers = {
    [key: string]: {
        [key: string]: UserResolver
    }
}