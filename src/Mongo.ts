import { connect, connection, model, Schema } from 'mongoose';
import { CollectionModel } from 'Interface';

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
    
        let collectionsDocuments: CollectionModel[] = [];
        let documentLength: number;
        let collectionName: string;
    
        for (const index of Object.keys(collections)) {
            
            collectionName = collections[index].name;
            documentLength = await model(collectionName, new Schema({})).count({});
            
            if (documentLength < 5000) {
                collectionsDocuments.push({
                    name: collectionName,
                    documents: await model(collectionName).find().lean()
                });
            } else {
                let getDocuments: Array<object> = [];
                // 5000개씩 잘라서 merge
                for (let skip = 0; skip < documentLength; skip += 5000) {
                    getDocuments.push(
                        await model(collectionName)
                        .find()
                        .lean()
                        .sort('_id')
                        .skip(skip)
                        .limit(5000)
                    );
                }
                
                // 10만건이 넘는 경우 스택에 계속 쌓여서 메모리 힙이 나버리기 때문에 긁어온 후 제거하고 다시 스키마 생성
                delete connection.models[collectionName];
                delete connection.collections[collectionName];
                await model(collectionName, new Schema({}));

                collectionsDocuments.push({
                    name: collectionName,
                    documents: getDocuments.flat()
                });
            }
            
            // back my memory
            delete connection.models[collectionName];
            delete connection.collections[collectionName];
        }
        
        console.log(`Get Documents Finish ${new Date()}`);
        return collectionsDocuments;

    } catch(e) {
        throw new Error(`Mongo Error = ${e}`);
    }
}