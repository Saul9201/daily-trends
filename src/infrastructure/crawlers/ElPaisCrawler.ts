import Feed from '../../domain/feed.model';
import FeedCrawler from '../../domain/feed-crawler';
import * as cheerio from 'cheerio';
import axios from 'axios';

export default class ElPaisCrawler extends FeedCrawler {
    url: string = 'https://www.elpais.es';
    name: string = 'El País';

    async crawl(options?: { maxFeeds?: number}): Promise<Feed[]> {
        const response = await axios.get(this.url);
        const html = response.data;
        const $ = cheerio.load(html);
        const articles: Feed[] = [];
        $('article').each((index, element) => {
            const title = $('header h2 a', element).text();
            const url = $('header h2 a', element).attr('href');
            const thumbnail = $('figure img', element).attr('src');
            if (title && url) {
                articles.push({
                    title,
                    url,
                    source: this.name,
                    date: new Date(),
                    thumbnail: thumbnail ? thumbnail : undefined
                });
                if (options?.maxFeeds && articles.length >= options.maxFeeds) {
                    return false;
                }
            }
        });

        return articles;
    }
}