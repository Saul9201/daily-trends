import { Request, Response } from 'express';
import { FeedsService } from '../../../../application/feed.service';
import BaseController, { RequestValidationSchema } from '../base.controller';
import { z } from 'zod';

const requestBodyValidator = z.object({
    url: z.string().url().optional(),
    title: z.string().optional(),
    content: z.string().optional(),
    source: z.enum(['El País', 'El Mundo']).optional(),
    date: z.coerce.date().optional(),
    thumbnail: z.string().url().optional(),
});
  
type UpdateFeedRequest = Request<
    { id: string },
    Request['res'],
    z.infer<typeof requestBodyValidator>
>;

export default class UpdateFeedController extends BaseController {
    constructor(private feedsService: FeedsService){
        super();
    }
    protected getValidationDefinition(): void | RequestValidationSchema {
        return {
            body: requestBodyValidator,
        };
    }
  
    async execute(req: UpdateFeedRequest, res: Response): Promise<void> {
        const feed = await this.feedsService.update(req.params.id, req.body);
        if(!feed) res.status(404).json({message: 'Feed not found'});
        res.status(200).json(feed);
    }
}