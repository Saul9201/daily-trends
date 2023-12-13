import { Request, Response } from 'express';
import { FeedsService } from '../../../../application/feed.service';
import BaseController from '../base.controller';

type DeleteFeedRequest = Request<
    { id: string },
    Request['res'],
    Request['body']
>;

export default class DeleteFeedController extends BaseController {
    constructor(private feedsService: FeedsService){
        super();
    }
  
    async execute(req: DeleteFeedRequest, res: Response): Promise<void> {
        const feedToDelete = await this.feedsService.get(req.params.id);
        if(!feedToDelete) {
            res.status(404).json({message: 'Feed not found'});
            return;
        }
        await this.feedsService.delete(req.params.id);
        res.status(200).json(feedToDelete);
    }
}