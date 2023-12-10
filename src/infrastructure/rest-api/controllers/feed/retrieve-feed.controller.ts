import { Request, Response } from 'express';
import { FeedsService } from '../../../../application/feed.service';
import BaseController from '../base.controller';
  
type RetrieveFeedRequest = Request<
    { id: string },
    Request['res'],
    Request['body']
>;

export default class RetrieveFeedController extends BaseController {
    constructor(private feedsService: FeedsService){
        super();
    }
  
    async execute(req: RetrieveFeedRequest, res: Response): Promise<void> {
        const feed = await this.feedsService.get(req.params.id);
        if(!feed) {
            res.status(404).json({message: 'Feed not found'});
            return;
        }
        res.status(200).json(feed);
    }
}