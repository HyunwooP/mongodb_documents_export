import { connect, connection, model, Schema } from 'mongoose';

export default async (url: string, option: object) => {
    
    if (!url) {
        throw new Error('Can not find Mongo URL');
    }
    
    try {
        console.log(`Get Documents Start ${new Date()}`);
        await connect(url, option);

        const collections: Array<object> = await connection.db.listCollections().toArray();
    
        if (!collections) {
            throw new Error('Can not load Collection');
        }
    
        let collectionsDocuments: Array<object> = [];
        let mergeDocuments: Array<object> = [];
        let documentLength: number;
        let collectionName: string;
    
        for (const index of Object.keys(collections)) {
            
            collectionName = collections[index].name;
            documentLength = await model(collectionName, new Schema({})).count({});
            
            if (documentLength < 5000) {
                collectionsDocuments.push({
                    name: collectionName,
                    documents: await model(collectionName).find({})
                });
            } else {
                // 5000개씩 잘라서 merge
                // todo = heap out of memory 해결하기
                for (let skip = 0; skip < documentLength; skip += 5000) {
                    mergeDocuments.push(await model(collectionName).find({}).sort('_id').skip(skip).limit(skip+5000));
                }
                
                console.log(mergeDocuments);

                collectionsDocuments.push({
                    name: collectionName,
                    documents: mergeDocuments
                });
            }
        }
        
        console.log(`Get Documents Finish ${new Date()}`);
        return collectionsDocuments;
    } catch(e) {
        throw new Error(e);
    }
}