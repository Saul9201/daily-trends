import AddFeedController from './rest-api/controllers/feed/add.controller';
import RetrieveFeedController from './rest-api/controllers/feed/retrieve.controller';
import DeleteFeedController from './rest-api/controllers/feed/delete.controller';
import UpdateFeedController from './rest-api/controllers/feed/update.controller';
import ListFeedController from './rest-api/controllers/feed/list.controller';
import { FeedsService } from '../application/feed.service';
import { CrawlerService } from '../application/crawler.service';
import { MongoDBFeedRepository } from './repositories/feed.repository';
import container from './dependencies.container';
import { asClass, asValue } from 'awilix';
import getClient from './getMongoClient';
import ElMundoCrawler from './crawlers/ElMundoCrawler';
import ElPaisCrawler from './crawlers/ElPaisCrawler';
import CrawlFeedController from './rest-api/controllers/feed/crawl.controller';
import { MongoDBIdFactory } from './repositories/mongodb-id.factory';

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
        'crawlerService': asClass(CrawlerService),
        'elMundoCrawler': asClass(ElMundoCrawler),
        'elPaisCrawler': asClass(ElPaisCrawler),
        'crawlFeedController': asClass(CrawlFeedController),
        'idFactory': asClass(MongoDBIdFactory).singleton(),
    });
    container.register({
        'crawlers': asValue([
            container.resolve('elMundoCrawler'),
            container.resolve('elPaisCrawler')
        ])
    });
}