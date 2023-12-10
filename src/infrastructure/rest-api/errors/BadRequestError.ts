import HttpError from './HttpError';

export default class BadRequestError extends HttpError {
    constructor(description: string, details?: Record<string, unknown>) {
        super({ status: 400, message: 'Bad Request', description, details });
    }
}
