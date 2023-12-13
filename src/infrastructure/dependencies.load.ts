import AddFeedController from './rest-api/controllers/feed/add.controller';
import RetrieveFeedController from './rest-api/controllers/feed/retrieve.controller';
import DeleteFeedController from './rest-api/controllers/feed/delete.controller';
import UpdateFeedController from './rest-api/controllers/feed/update.controller';
import ListFeedController from './rest-api/controllers/feed/list.controller';
import { FeedsService } from '../application/feed.service';
import { MongoDBFeedRepository } from './repositories/feed.repository';
import container from './dependencies.container';
import { asClass, asValue } from 'awilix';
import getClient from './getMongoClient';

export default async function loadDependencies() {
    const mongoClient = await getClient();
    container.register({
        'mongoClient': asValue(mongoClient),
        'feedsRepository': asClass(MongoDBFeedRepository).singleton(),
        'feedsService': asClass(FeedsService).singleton(),
        'addFeedController': asClass(AddFeedController),
        'retrieveFeedController': asClass(RetrieveFeedController),
        'deleteFeedController': asClass(DeleteFeedController),
        'updateFeedController': asClass(UpdateFeedController),
        'listFeedController': asClass(ListFeedController),
    });
}