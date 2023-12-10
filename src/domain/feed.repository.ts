import {Feed} from './feed.entity';

export interface ListFilter {
    limit: number;
    offset: number;
    startDate: Date;
    endDate: Date;
}

export interface FeedRepository {
    add(feed: Omit<Feed, 'id'>): Promise<Feed>;
    get(id: string): Promise<Feed | undefined>;
    list(filter: ListFilter): Promise<Feed[]>;
    update(id: string, feed: Partial<Omit<Feed, 'id'>>): Promise<Feed | undefined>;
    delete(id: string): Promise<boolean>;
}
