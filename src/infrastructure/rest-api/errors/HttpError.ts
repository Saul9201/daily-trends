export default class HttpError extends Error {
    public status: number;

    public description: string;

    public errorCode?: string;

    public details: {
        [key: string]: unknown;
    };

    constructor({
        status,
        message,
        description,
        details,
    }: {
        status: number;
        message: string;
        description: string;
        details?: {
            errorCode?: string;
            [key: string]: unknown;
        };
    }) {
        super(message);
        this.name = 'HttpError';
        this.status = status;
        this.message = message;
        this.description = description;

        const { errorCode, ...errorDetails } = details || {};
        this.details = { ...errorDetails };
        this.errorCode = errorCode;
    }
}
