import { Response, Request } from "express";
import config from 'config';
import Session from "../models/session.model";
import { createSession, findSession } from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";

export async function createSessionHandler(req : Request, res: Response){
    //validate user's password
    const user = await validatePassword(req.body);

    if(!user){
        return res.status(401).send('Invalid email or password')
    }

    //create a session
    const session =  await createSession(user._id, req.get('user-agent') || '');

    //create an access token
    const accessToken = signJwt(
        { ...user, session: session._id },
        { expiresIn: config.get('accessTokenTtl')} //15minutes
    )
    //create a refresh token 
    const refreshToken = signJwt(
        { ...user, session: session._id },
        { expiresIn: config.get('accessTokenTtl')} //15minutes
    )
   //return access token and refresh
   return res.send({accessToken, refreshToken})
}

export async function getUserSessionHandler(req : Request, res: Response){
    const userId = res.locals.user._id;

    const session = await findSession({user: userId, valid: true})
    return res.send(session)
}