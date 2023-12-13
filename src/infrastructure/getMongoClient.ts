import { MongoClient } from 'mongodb';

async function getClient(): Promise<MongoClient> {
    const client: MongoClient = new MongoClient(process.env.DB_CONN_STRING!);
    await client.connect();
    return client;
}

export default getClient;