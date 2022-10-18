import express from 'express';
import config from 'config';
import connects from './utils/connects';
import logger from './utils/logger';
import routes from './utils/routes';

const port = config.get<number>('port')
const app = express();

app.use(express.json());

app.listen(port, async ()=>{
    logger.info(`App is runnig at http://localhost:${port}`);
    
    await connects();
    
    routes(app);
})