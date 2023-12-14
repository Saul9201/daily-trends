import { Request, Response } from 'express';
import { CrawlerService } from '../../../../application/crawler.service';
import BaseController from '../base.controller';
  

export default class CrawlFeedCotroller extends BaseController {
    constructor(
        private crawlerService: CrawlerService
    ){
        super();
    }
  
    async execute(req: Request, res: Response): Promise<void> {
        await this.crawlerService.execute();
        res.json({message: 'ok'});
    }
}