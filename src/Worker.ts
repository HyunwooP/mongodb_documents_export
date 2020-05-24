import Mongo from './Mongo';
import File from './File';

export const worker = async () => {
    
    try {
        const collectionsDocuments: Array<object> = await Mongo('mongodb://localhost:27017/kda2020', {});
        
        for (const collectionsDocument of collectionsDocuments) {
            File(collectionsDocument);
        }
    } catch(e) {
        console.error(e);
    }

}

worker();