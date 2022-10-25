import {Express, Request, Response} from 'express'
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from '../controller/product.controller';
import { createSessionHandler, deleteSessionHandler, getUserSessionHandler } from '../controller/session.controller';
import { createUserHandler } from '../controller/user.controller';
import requireUser from '../middleware/requireUser';
import validateResource from '../middleware/validateResource';
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from '../schema/product.schema';
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
    //delete user session
    app.delete('/api/sessions', requireUser, deleteSessionHandler);

    //product routes
    //create product
    app.post(
        '/api/products', 
        [requireUser, validateResource(createProductSchema)],
        createProductHandler    
    )
    //update product
    app.put(
        '/api/products/:productId', 
        [requireUser, validateResource(updateProductSchema)],
        updateProductHandler    
    )
    //get product 
    app.get(
        '/api/products/:productId',
        validateResource(getProductSchema),
        getProductHandler
    )
    //delete product
    app.delete(
        '/api/products/:productId', 
        [requireUser, validateResource(deleteProductSchema)],
        deleteProductHandler    
    )
}

export default routes;