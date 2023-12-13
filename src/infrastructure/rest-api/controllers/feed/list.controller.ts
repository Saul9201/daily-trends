import { Request, Response } from 'express';
import { FeedsService } from '../../../../application/feed.service';
import BaseController, { RequestValidationSchema } from '../base.controller';
import { z } from 'zod';

const queryValidation = z.object({
    limit: z.coerce.number().int().optional(),
    offset: z.coerce.number().int().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(), 
});
  
type ListFeedRequest = Request<
    Request['params'],
    Request['res'],
    Request['body'],
    z.infer<typeof queryValidation>
>;

export default class ListFeedController extends BaseController {
    constructor(private feedsService: FeedsService){
        super();
    }
    protected getValidationDefinition(): void | RequestValidationSchema {
        return {
            query: queryValidation,
        };
    }
    async execute(req: ListFeedRequest, res: Response): Promise<void> {
        res.status(200).json(await this.feedsService.list(req.query));
    }
}