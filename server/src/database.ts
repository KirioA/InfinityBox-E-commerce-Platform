import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { exit } from 'process';
dotenv.config();

const client = new MongoClient(process.env.DB_URI);

const main = async () => {
    try {
        await client.connect();
        await listDatabases(client);
    } catch (e) {
        console.error(e);
        exit(1);
    }
};

async function listDatabases(client: MongoClient){
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

const dbGetConnection = async () => {
    return client.db();
}

main().catch(console.error);

export { dbGetConnection };
