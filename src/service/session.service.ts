import { FilterQuery } from "mongoose";
import Session, {sessionDocument} from "../models/session.model";

export async function createSession (userId: string, userAgent:string){
    const session = await Session.create({user: userId, userAgent});
    
    return session.toJSON();
}

export async function findSession(query: FilterQuery<sessionDocument>){
    return Session.find(query).lean();
}