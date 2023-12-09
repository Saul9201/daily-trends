import express from 'express';
import { config } from './config';

function boostrap() {
    const app = express();

    app.use(express.json());

    const { port } = config.server;

    app.listen(port, () => {
        console.log(`[APP] - Starting application on port ${port}`);
    });
}

boostrap();
