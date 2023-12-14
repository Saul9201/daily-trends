/* eslint-disable @typescript-eslint/no-explicit-any */
import request from 'supertest';
import {boostrap} from '../app';

describe('Feed', () => {
    let app: any;
    const createdFeeds: string[] = [];
    
    beforeAll(async () => {
        app = await boostrap();
    });
    
    afterAll(async () => {
        await Promise.all(createdFeeds.map((id) => request(app).delete(`/feeds/${id}`)));
        await app.close();
    });

    describe('POST /feeds', () => {
        it('should validate the input', async () => {
            const res = await request(app)
                .post('/feeds')
                .send({
                    'url': 'https://elpais.com/tecnologia/2023-12-08/la-ue-aprueba-la-primera-ley-de-inteligencia-artificial-del-mundo.html',
                    'title': 'Esto es una prueba de titulo',
                    'content': 'Esto es una prueba de contenido',
                    'source': 'CNN',
                    'date': '2023-12-09T01:54:59.286Z',
                });
            expect(res.status).toBe(400);
        });
        it('should create the feed', async () => {
            const res = await request(app)
                .post('/feeds')
                .send({
                    'url': 'https://elpais.com/tecnologia/2023-12-08/la-ue-aprueba-la-primera-ley-de-inteligencia-artificial-del-mundo.html',
                    'title': 'Esto es una prueba de titulo',
                    'content': 'Esto es una prueba de contenido',
                    'source': 'El País',
                    'date': '2023-12-09T01:54:59.286Z',
                });
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('id');
            createdFeeds.push(res.body.id);
        });
    });
    describe('PATCH /feeds/:id', () => {
        it('should validate the input', async () => {
            const feedToUpdate = await request(app)
                .post('/feeds')
                .send({
                    'url': 'https://elpais.com/tecnologia/2023-12-08/la-ue-aprueba-la-primera-ley-de-inteligencia-artificial-del-mundo.html',
                    'title': 'Esto es una prueba de titulo',
                    'content': 'Esto es una prueba de contenido',
                    'source': 'El País',
                    'date': '2023-12-09T01:54:59.286Z',
                });
            createdFeeds.push(feedToUpdate.body.id);
            const id = feedToUpdate.body.id;
            const res = await request(app)
                .patch(`/feeds/${id}`)
                .send({
                    'title': 'Esto es una prueba de titulo actualizado',
                    'content': 'Esto es una prueba de contenido actualizado',
                    'source': 'CNN',
                });
            expect(res.status).toBe(400);
        });
        it('should update the feed', async () => {
            const feedToUpdate = await request(app)
                .post('/feeds')
                .send({
                    'url': 'https://elpais.com/tecnologia/2023-12-08/la-ue-aprueba-la-primera-ley-de-inteligencia-artificial-del-mundo.html',
                    'title': 'Esto es una prueba de titulo',
                    'content': 'Esto es una prueba de contenido',
                    'source': 'El País',
                    'date': '2023-12-09T01:54:59.286Z',
                });
            createdFeeds.push(feedToUpdate.body.id);
            const id = feedToUpdate.body.id;
            const res = await request(app)
                .patch(`/feeds/${id}`)
                .send({
                    'title': 'Esto es una prueba de titulo actualizado',
                    'content': 'Esto es una prueba de contenido actualizado',
                    'source': 'El Mundo',
                });
            expect(res.status).toBe(200);
            expect(res.body).toEqual(expect.objectContaining({
                'title': 'Esto es una prueba de titulo actualizado',
                'content': 'Esto es una prueba de contenido actualizado',
                'source': 'El Mundo',
            }));
        });
    });
});