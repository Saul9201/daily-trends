import AddFeedController from './rest-api/controllers/feed/add-feed.controller';
import RetrieveFeedController from './rest-api/controllers/feed/retrieve-feed.controller';
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
        'retrieveFeedController': asClass(RetrieveFeedController)
    })
}