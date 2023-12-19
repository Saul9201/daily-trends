import FeedCrawler from '../domain/feed-crawler';
import { FeedsService } from './feed.service';
import FeedModel from '../domain/feed.model';

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
        );
        await this.feedsService.addIfNotExists(feeds);
    }
}