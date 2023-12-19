import {Feed} from '../domain/feed.entity';
import {FeedRepository, ListOrder} from '../domain/feed.repository';
import { ListFilter } from '../domain/feed.repository';
import { IdFactory } from '../domain/id.factory';

export class FeedsService {
    constructor(
        private feedsRepository: FeedRepository,
        private idFactory: IdFactory,
    ){} 
  
    async add(feed: Omit<Feed, 'id'>): Promise<Feed> {
        const id = this.idFactory.generateId(feed.url);
        return this.feedsRepository.add({
            id,
            ...feed
        });
    }

    async list(filter?: ListFilter, order?: ListOrder): Promise<Feed[]> {
        return this.feedsRepository.list(filter, order);
    }

    async update(id: string, feed: Partial<Omit<Feed, 'id'>>): Promise<Feed | undefined> {
        return this.feedsRepository.update(id, feed);
    }

    async delete(id: string): Promise<boolean> {
        return this.feedsRepository.delete(id);
    }

    async get(id: string): Promise<Feed | undefined> {
        return this.feedsRepository.get(id);
    }

    async addIfNotExists(feeds: Omit<Feed, 'id'>[]): Promise<string[]> {
        return this.feedsRepository.addIfNotExists(feeds.map(feed => ({
            id: this.idFactory.generateId(feed.url),
            ...feed,
        })));
    }
}