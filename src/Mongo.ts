import { connect, connection, model, Schema } from 'mongoose';
import { CollectionModel, OptionModel } from 'Interface';

const generateCollectionDocuments = async (collections, index) => {
    const collectionName = collections[index].name;
    const documentLength = await model(collectionName, new Schema({})).count({});
    let result: CollectionModel = { name: '', documents: []};

    if (documentLength < 5000) {
        result = {
            name: collectionName,
            documents: await model(collectionName).find().lean()
        };
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

        result = {
            name: collectionName,
            documents: getDocuments.flat()
        };
    }
    
    // back my memory
    delete connection.models[collectionName];
    delete connection.collections[collectionName];

    return result;
}

export default async (option: OptionModel, mongoOption: object): Promise<Array<CollectionModel>>  => {
    
    try {
        await connect(option.url, mongoOption);

        const collections: Array<object> = await connection.db.listCollections().toArray();
    
        if (!collections) {
            throw new Error('Can not load Collection');
        }
        
        let collectionDocuments: Array<CollectionModel> = [];
    
        for (const index of Object.keys(collections)) {
            // target collection documents
            if (option.target.length > 0) {
                for (const target of option.target) {
                    if (target === collections[index].name) {
                        collectionDocuments.push(await generateCollectionDocuments(collections, index));
                    }
                }
            // all collection documents
            } else {
                collectionDocuments.push(await generateCollectionDocuments(collections, index));
            }
        }
        
        return collectionDocuments;

    } catch(e) {
        throw new Error(`Mongo Error = ${e}`);
    }
}