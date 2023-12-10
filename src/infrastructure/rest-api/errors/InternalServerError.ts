import HttpError from './HttpError';

export default class InternalServerError extends HttpError {
    constructor(public message: string) {
        super({
            status: 500,
            message,
            description: '',
        });
        this.name = 'InternalServerError';
    }
}