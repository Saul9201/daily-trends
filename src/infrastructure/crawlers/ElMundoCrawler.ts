import Feed from '../../domain/feed.model';
import FeedCrawler from '../../domain/feed-crawler';
import * as cheerio from 'cheerio';
import axios from 'axios';

export default class ElMundoCrawler extends FeedCrawler {
    url: string = 'https://www.elmundo.es';
    name: string = 'El Mundo';

    async crawl(options?: { maxFeeds?: number}): Promise<Feed[]> {
        const response = await axios.get(this.url, { responseType: 'arraybuffer' });
        const html = response.data.toString('latin1');
        const $ = cheerio.load(html, { decodeEntities: false });
        const articles: Feed[] = [];
        $('article').each((index, element) => {
            const title = $('header a h2', element).text();
            const url = $('> a', element).attr('href');
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