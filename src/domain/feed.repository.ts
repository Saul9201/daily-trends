import {Feed} from './feed.entity';

export interface ListFilter {
    limit?: number;
    offset?: number;
    startDate?: Date;
    endDate?: Date;
    match?: Partial<Omit<Feed, 'id'>>;
}

export type ListOrder = {
    [P in keyof Feed]?: 'asc' | 'desc';
};

export interface FeedRepository {
    add(feed: Omit<Feed, 'id'> & { id?: Feed['id']}): Promise<Feed>;
    get(id: string): Promise<Feed | undefined>;
    list(filter?: ListFilter, order?: ListOrder): Promise<Feed[]>;
    update(id: string, feed: Partial<Omit<Feed, 'id'>>): Promise<Feed | undefined>;
    delete(id: string): Promise<boolean>;
    addIfNotExists(feeds: Feed[]): Promise<string[]>;
}
