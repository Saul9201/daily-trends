import {Feed} from '../domain/feed.entity';
import {FeedRepository} from '../domain/feed.repository';
import { ListFilter } from '../domain/feed.repository';

export class FeedsService {
    constructor(
        private feedsRepository: FeedRepository, 
    ){} 
  
    async add(feed: Omit<Feed, 'id'>): Promise<Feed> {
        return this.feedsRepository.add(feed);
    }

    async list(filter?: ListFilter): Promise<Feed[]> {
        return this.feedsRepository.list(filter);
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

    async addIfNotExists(feeds: Feed[]): Promise<string[]> {
        return this.feedsRepository.addIfNotExists(feeds);
    }
}