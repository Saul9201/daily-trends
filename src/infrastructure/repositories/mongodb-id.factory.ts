import { IdFactory } from '../../domain/id.factory';
import crypto from 'crypto';

export class MongoDBIdFactory extends IdFactory {
    generateId(...params: string[]): string {
        const seed = params.filter(item => Boolean(item)).map(item => String(item)).join('');
        const id = crypto.createHash('md5').update(seed).digest('hex').slice(0, 24);
        return id;
    }
}