import * as mongoDB from "mongodb";

export default abstract class MongoDbBaseRepository<T extends mongoDB.BSON.Document> {
    protected db: mongoDB.Db;
    protected collection: mongoDB.Collection<T>;

    constructor(client: mongoDB.MongoClient, collectionName: string) {
        this.db = client.db(process.env.DB_NAME);
        this.collection = this.db.collection<T>(collectionName);
    }
}