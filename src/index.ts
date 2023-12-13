import loadDependencies  from './infrastructure/dependencies.load';
import express from 'express';
import { config } from './config';
import errorHandler from './infrastructure/rest-api/middlewares/error-handler';
import { injectRouter as injectFeedsRouter } from './infrastructure/rest-api/controllers/feed/router';

async function boostrap() {
    await loadDependencies();
    const app = express();

    app.use(express.json());

    injectFeedsRouter(app);

    app.use(errorHandler);

    const { port } = config.server;

    app.listen(port, () => {
        console.log(`[APP] - Starting application on port ${port}`);
    });
}

boostrap();
