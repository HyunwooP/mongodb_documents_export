import mongo from './mongo';
import { OptionModel } from './interface';

export const worker = async (option: OptionModel): Promise<string[]> => {
    
    if (!option.url) {
        throw new Error('Can not find Mongo URL');
    }

    try {
        const result: string[] = await mongo(option, {});
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