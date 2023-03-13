import bcrypt from "bcrypt";

/*
*Handling by Error Message*/
interface IErrorWithMessage {
    message: string;
}

const isErrorWithMessage = (error: unknown): error is IErrorWithMessage => {
    return (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof (error as Record<string, unknown>).message === "string"
    )
}

const toErrorWithMessage = (maybeError: unknown): IErrorWithMessage => {
    if (isErrorWithMessage(maybeError)) return maybeError;

    try {
        return new Error(JSON.stringify(maybeError));
    } catch {
        return new Error(String(maybeError));
    }
}

/*
*by bcrypt*/
export const getErrorMessage = (error: unknown) => toErrorWithMessage(error).message;
export const getPasswordHash = async (password: string) => await bcrypt.hash(password, 10);
export const isMatchPassword = async (password: string, hash: string) => await bcrypt.compare(password, hash);