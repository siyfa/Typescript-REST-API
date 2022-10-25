import config from "config";
import { get } from "lodash";
import { FilterQuery, UpdateQuery } from "mongoose";
import Session, {sessionDocument} from "../models/session.model";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { findUser } from "./user.service";

export async function createSession (userId: string, userAgent:string){
    const session = await Session.create({user: userId, userAgent});

    return session.toJSON();
}

export async function findSession(query: FilterQuery<sessionDocument>){
    return Session.find(query).lean();
}

export async function updateSession(query: FilterQuery<sessionDocument>, update: UpdateQuery<sessionDocument>){
    return Session.updateOne(query, update);
}

export async function reIssueAccessToken({refreshToken}: {refreshToken: string}){

    const {decoded} = verifyJwt(refreshToken)

    if(!decoded || !get(decoded, 'session')) return false;

    const session = await Session.findById(get(decoded, 'session'));

    if(!session || !session.valid) return false;

    const user = await findUser({_id: session.user});
    
    if(!user) return false;

    //create an access token
    const accessToken = signJwt(
        { ...user, session: session._id },
        { expiresIn: config.get('accessTokenTtl')} //15minutes
    )

    return accessToken;

}