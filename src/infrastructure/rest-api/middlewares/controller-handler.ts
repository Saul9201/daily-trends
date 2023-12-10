import { Request, Response } from 'express';
import errorBoundaryHandler from './error-boundary';
import BaseController from '../base.controller';

const controllerHandler = (controller: BaseController) =>
    errorBoundaryHandler(async (req: Request, res: Response) => {
        await controller.validate(req);
        return controller.execute(req, res);
    });

export default controllerHandler;