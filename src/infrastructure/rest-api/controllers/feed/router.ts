import express from 'express';
import controllerHandler from '../../middlewares/controller-handler';
import container from '../../../dependencies.container';
import AddFeedController from './add.controller';
import RetrieveFeedController from './retrieve.controller';
import DeleteFeedController from './delete.controller';
import UpdateFeedController from './update.controller';
import ListFeedController from './list.controller';

export const injectRouter = (app: express.Application) => {
    const router = express.Router();
    
    router.post('/', controllerHandler(container.resolve<AddFeedController>('addFeedController')));
    router.get('/:id', controllerHandler(container.resolve<RetrieveFeedController>('retrieveFeedController')));
    router.delete('/:id', controllerHandler(container.resolve<DeleteFeedController>('deleteFeedController')));
    router.patch('/:id', controllerHandler(container.resolve<UpdateFeedController>('updateFeedController')));
    router.get('/', controllerHandler(container.resolve<ListFeedController>('listFeedController')));
    
    app.use('/feeds', router);
}

