import express from 'express';
import config from 'config';
import connects from './utils/connects';
import logger from './utils/logger';
import routes from './utils/routes';
import deserializeUser from './middleware/deserializeUser';

const port = config.get<number>('port')

const app = express();

app.use(express.json());
app.use(deserializeUser);

app.listen(port, async ()=>{
    logger.info(`App is runnig at http://localhost:${port}`);
    
    await connects();
    
    routes(app);
})