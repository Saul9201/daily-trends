import type { Request, Response } from 'express';
import type { ZodType } from 'zod';
import BadRequestError from '../errors/BadRequestError';

export interface RequestValidationSchema {
    query?: ZodType;
    params?: ZodType;
    body?: ZodType;
}

export async function handleValidation(
    validationSchema: RequestValidationSchema,
    req: Request,
) {
    const { query, params, body } = validationSchema;

    return {
        query: await query?.safeParseAsync(req.query),
        params: await params?.safeParseAsync(req.params),
        body: await body?.safeParseAsync(req.body),
    };
}

export default abstract class BaseController {
    protected getValidationDefinition(): void | RequestValidationSchema { }

    public async validate(req: Request): Promise<void> {
        const validationSchema = this.getValidationDefinition();

        if (validationSchema) {
            const parsedResult = await handleValidation(validationSchema, req);
            
            if (parsedResult.body?.success) {
                req.body = parsedResult.body.data;
            }

            if (parsedResult.params?.success) {
                req.params = parsedResult.params.data;
            }

            if (parsedResult.query?.success) {
                req.query = parsedResult.query.data;
            }

            const errors = [
                parsedResult.query,
                parsedResult.params,
                parsedResult.body,
            ]
                .flatMap(r => (!r || r?.success ? [] : r.error.errors))
                .map(err => err.message);

            if (errors.length > 0) {
                throw new BadRequestError('Invalid input.', {
                    errorCode: errors[0],
                });
            }
        }
    }

    abstract execute(req: Request, res: Response): Promise<void>;
}
