import {Express, Request, Response} from 'express'
import { createSessionHandler, getUserSessionHandler } from '../controller/session.controller';
import { createUserHandler } from '../controller/user.controller';
import requireUser from '../middleware/requireUser';
import validateResource from '../middleware/validateResource';
import { createSessionSchema } from '../schema/session.schema';
import { createUserSchema } from '../schema/user.schema';

function routes(app: Express){
    //healthcheck
    app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));
    //create user
    app.post('/api/users', validateResource(createUserSchema), createUserHandler)
    //create session
    app.post('/api/session', validateResource(createSessionSchema), createSessionHandler)
    //get user session
    app.get('/api/sessions', requireUser, getUserSessionHandler);
}

export default routes;