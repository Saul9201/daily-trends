import { Request, Response } from 'express';
import { FeedsService } from '../../../../application/feed.service';
import BaseController, { RequestValidationSchema } from '../base.controller';
import { z } from 'zod';

const requestBodyValidator = z.object({
    url: z.string().url(),
    title: z.string(),
    content: z.string(),
    source: z.enum(['El País', 'El Mundo']),
    date: z.coerce.date(),
    thumbnail: z.string().url().optional(),
});
  
type AddFeedRequest = Request<
    Request['params'],
    Request['res'],
    z.infer<typeof requestBodyValidator>
>;

export default class AddFeedController extends BaseController {
    constructor(private feedsService: FeedsService){
        super();
    }
    protected getValidationDefinition(): void | RequestValidationSchema {
        return {
            body: requestBodyValidator,
        };
    }
  
    async execute(req: AddFeedRequest, res: Response): Promise<void> {
        const feed = await this.feedsService.add(req.body);
        res.status(200).json(feed);
    }
}