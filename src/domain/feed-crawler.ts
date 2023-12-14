import Feed from './feed.model';

export default abstract class FeedCrawler {
    abstract url: string;
    abstract name: string;

    abstract crawl(options?: { maxFeeds?: number }): Promise<Feed[]>;
}