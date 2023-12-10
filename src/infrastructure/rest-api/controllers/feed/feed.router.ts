import express from 'express';
import controllerHandler from '../../middlewares/controller-handler';
import container from '../../../dependencies.container';
import AddFeedController from './add-feed.controller';
import RetrieveFeedController from './retrieve-feed.controller';

export const injectRouter = (app: express.Application) => {
    const router = express.Router();
    
    router.post('/', controllerHandler(container.resolve<AddFeedController>('addFeedController')));
    router.get('/:id', controllerHandler(container.resolve<RetrieveFeedController>('retrieveFeedController')));
    
    app.use('/feeds', router);
}

