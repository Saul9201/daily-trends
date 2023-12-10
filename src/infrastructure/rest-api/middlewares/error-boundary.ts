import type { NextFunction, Request, RequestHandler, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Async<T extends (...args: any[]) => any> = (
    ...args: Parameters<T>
) => Promise<ReturnType<T>>;

const mainRequestHandler =
    (fn: Async<RequestHandler>) =>
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                await fn(req, res, next);
            } catch (error) {
                next(error);
            }
        };

export default mainRequestHandler;
