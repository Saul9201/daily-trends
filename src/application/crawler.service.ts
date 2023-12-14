import FeedCrawler from '../domain/feed-crawler';
import crypto from 'crypto';
import { FeedsService } from './feed.service';
import FeedModel from '../domain/feed.model';

const generateIdFrom = (...params: string[]) => {
    const seed = params.filter(item => Boolean(item)).map(item => String(item)).join('');
    const id = crypto.createHash('md5').update(seed).digest('hex').slice(0, 24);
    return id;
};

export class CrawlerService {
    constructor(
        private readonly crawlers: FeedCrawler[],
        private readonly feedsService: FeedsService,
    ) {}

    async execute() {
        const feedCraws = await Promise.all(
            this.crawlers.map(crawler => crawler.crawl())
        );
        const feeds = Array.from(
            feedCraws
                .reduce((acc, feeds) => [...acc, ...feeds], [])
                .reduce((acc, feed) => {
                    if (!acc.has(feed.url)) {
                        acc.set(feed.url, feed);
                    }
                    return acc;
                }, new Map<string, FeedModel>())
                .values()
        ).map(feed => ({ ...feed, id: generateIdFrom(feed.url) }));
        await this.feedsService.addIfNotExists(feeds);
    }
}