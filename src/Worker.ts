import Mongo from './Mongo';
import { generateCSV } from './File';

export const Worker = async () => {
    
    try {

        const collectionsDocuments: Array<object> = await Mongo('mongodb://localhost:27017/kda2020', {});
        
        let result: Array<string | Error> = [];

        for (const collectionsDocument of collectionsDocuments) {
            result.push(generateCSV(collectionsDocument));
        }

        return result;

    } catch(e) {
        throw new Error(e);
    }
}

Worker().then(result => console.log(result));