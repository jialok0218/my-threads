import assert from "node:assert";
import AppError from "./AppError";
import { HttpStatusCode } from "../constants/http";
import AppErrorCode from "../constants/appErrorCode";

type AppAssert = (
    condition: any,
    httpStatusCode: HttpStatusCode,
    message: string,
    appErrorCode?: AppErrorCode
) => asserts condition;

/**
 * Asserts a condition and throws an AppEroor if the cond
 */

const appAssert: AppAssert = (
    condition: any,
    httpStatusCode,
    message,
    appErrorCode 
) => assert(condition, new AppError(httpStatusCode, message, appErrorCode));

export default appAssert;