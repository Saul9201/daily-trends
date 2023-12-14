import { Feed } from '../../domain/feed.entity';
import { FeedRepository } from '../../domain/feed.repository';
import * as mongoDB from 'mongodb';
import MongoDbBaseRepository from './mongodb.base.repository';
import { ListFilter } from '../../domain/feed.repository';


interface Query {
    date?: Record<string, Date>;
    [key: string]: unknown;
}

const getMongoDbQuery = (filter?: ListFilter): mongoDB.Filter<Omit<Feed, 'id'>> => {
    let query: Query = {};
    if (filter?.startDate) {
        query.date = {
            $gte: filter.startDate,
        };
    }
    if (filter?.endDate) {
        query.date = {
            ...query.date,
            $lt: filter.endDate,
        };
    }
    if (filter?.match) {
        query = {
            ...query,
            ...filter.match,
        } as Query;
        
    }
    return query;
};

export class MongoDBFeedRepository extends MongoDbBaseRepository<Omit<Feed, 'id'>> implements FeedRepository {
    constructor(mongoClient: mongoDB.MongoClient) {
        super(mongoClient, 'feeds');
    }
    async add(feed: Omit<Feed, 'id'>): Promise<Feed> {
        const res = await this.collection.insertOne({
            ...feed,
        });
        return this.get(res.insertedId.toHexString()) as Promise<Feed>;
    }
    async get(id: string): Promise<Feed | undefined> {
        const res = await this.collection.findOne({
            _id: new mongoDB.ObjectId(id),
        });
        if (!res) {
            return undefined;
        }
        const { _id, ...feed } = res;
        return {
            id: _id.toHexString(),
            ...feed,
        };
    }
    async list(filter?: ListFilter): Promise<Feed[]> {
        const query = getMongoDbQuery(filter);
        const res = await this.collection.find(query)
            .skip(filter?.offset || 0)
            .limit(filter?.limit || 10)
            .toArray();

        return res.map(({_id, ...data}) => ({
            id: _id.toHexString(),
            ...data,
        }));
    }

    async update(id: string, feed: Partial<Omit<Feed, 'id'>>): Promise<Feed | undefined> {
        await this.collection.updateOne({
            _id: new mongoDB.ObjectId(id),
        }, {
            $set: feed,
        });
        return this.get(id);
    }
    async delete(id: string): Promise<boolean> {
        const result = await this.collection.deleteOne({
            _id: new mongoDB.ObjectId(id),
        });
        return result.deletedCount === 1;
    }
    async addIfNotExists(feeds: Feed[]): Promise<string[]> {
        const existingFeeds = await this.collection.find({
            url: {
                $in: feeds.map(feed => feed.url),
            },
        }).toArray();
        const existingIds = existingFeeds.map(feed => feed._id.toHexString());
        const feedsToInsert = feeds.filter(feed => !existingIds.includes(feed.id));  
        if (feedsToInsert.length === 0) {
            return [];
        }
        await this.collection.insertMany(feedsToInsert.map(({id, ...feedData}) => ({
            _id: new mongoDB.ObjectId(id),
            ...feedData
        })));
        return feedsToInsert.map((feed) => feed.id);
    }
}
