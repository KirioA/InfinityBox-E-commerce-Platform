import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const client = new MongoClient(process.env.DB_URI);

const dbTestConnection = async () => {
    try {
        await client.connect();
        console.log('The connection to MongoDB has been successfully established!');
        
        const db = client.db();
        const result = await db.collection('test').findOne({});
        console.log('Test result: ', result);
    } catch (err) {
        console.error('MongoDB error:', err);
    } finally {
        await client.close();
    }
}

const dbGetConnection = async () => {
    if (!client.isConnected()) {
        await client.connect();
    }
    return client.db();
}

const dbQuery = async (collection, query) => {
    let db, res;
    try {
        db = await dbGetConnection();
        res = await db.collection(collection).find(query).toArray();
    } catch (err) {
        console.error('MongoDB error:', err);
    }
    return res;
}

export { dbTestConnection, dbGetConnection, dbQuery };
