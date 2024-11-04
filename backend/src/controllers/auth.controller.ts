import { z } from "zod";
import catchErrors from "../utils/catchErrors";
import { createAccount } from "../services/auth.service";
import { CREATED } from "../constants/http";
import { setAuthCookies } from "../utils/cookies";
import { loginSchema, registerSchema } from "./auth.schema";


export const registerHandler = catchErrors(async (req, res) => {
    //validate request
    const request = registerSchema.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],       
    });

    // call service
    const { user, accessToken, refreshToken } = await createAccount(request);

    // return response
    return setAuthCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json(user)
});

export const loginHandler = catchErrors(async (req, res) => {
    // validate request
    const request = loginSchema.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],
    });

    // call service
    const { user, accessToken, refreshToken } = await login(request);

    // return response
    return setAuthCookies({ res, accessToken, refreshToken })
    .json(user);
});
