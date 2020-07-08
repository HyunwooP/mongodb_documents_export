import mongo from './mongo';
import { generateCSV } from './file';
import { OptionModel, CollectionModel } from './interface';

export const worker = async (option: OptionModel): Promise<string[]> => {
    
    if (!option.url) {
        throw new Error('Can not find Mongo URL');
    }

    try {
        const collectionDocuments: CollectionModel[] = await mongo(option, {});
        let result: string[] = [];

        for (const collectionDocument of collectionDocuments) {
            result.push(generateCSV(collectionDocument, option));
        }
        
        return result;

    } catch(e) {
        throw new Error(e);
    }
}

const option: OptionModel = {
    split: '\t', // or ','
    url: 'mongodb://localhost:27017',
    charSet: 'utf-8',
    target: [],
    outputPath: './output'
};
worker(option)
.then(res=> {
    /**
     * [
     *   'collection1 DONE',
     *   'collection2 EMPTY',
     * ]
     */
    console.log(res);
    return res;
});