import { Request, Response } from 'express';
import { FeedsService } from '../../../../application/feed.service';
import BaseController, { RequestValidationSchema } from '../base.controller';
import { z } from 'zod';

const requestBodyValidator = z.object({
    url: z.string().url(),
    title: z.string(),
    content: z.string(),
    source: z.string().refine(s => s === 'El País' || s === 'El Mundo', 'source should be defined'),
    date: z.string(),
    thumbnail: z.string().optional().refine(t => {
        if(!t) {
            return true;
        }
        try { 
            new URL(t); 
            return true;
        }
        catch {
            return false;
        }
    }, 'thumbnail should be a valid URL')
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
        const feed = await this.feedsService.add({
            url: req.body.url,
            title: req.body.title,
            content: req.body.content,
            source: req.body.source,
            date: new Date(req.body.date),
            thumbnail: req.body.thumbnail,
        });
        res.status(200).json(feed);
    }
}