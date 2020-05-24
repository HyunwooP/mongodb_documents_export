import { connect, connection, model, Schema } from 'mongoose';

export default async (url: string, option: object) => {
    
    if (!url) {
        throw new Error('Can not find Mongo URL');
    }
    
    await connect(url, option);

    const collections: Array<object> = await connection.db.listCollections().toArray();

    if (!collections) {
        throw new Error('Can not load Collection');
    }

    let collectionsDocuments: Array<object> = [];

    for (const index of Object.keys(collections)) {
        collectionsDocuments.push({
            name: collections[index].name,
            documents: await model(collections[index].name, new Schema({})).find({})
        });
    }
    
    return collectionsDocuments;
}