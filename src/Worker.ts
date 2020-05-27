import Mongo from './Mongo';
import { generateCSV } from './File';
import { OptionModel, CollectionModel } from 'Interface';

export const Worker = async (option: OptionModel): Promise<Array<string>> => {
    
    if (!option.url) {
        throw new Error('Can not find Mongo URL');
    }

    try {
        const collectionDocuments: Array<CollectionModel> = await Mongo(option, {});
        let result: Array<string> = [];

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
Worker(option)
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