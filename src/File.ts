import { writeFileSync, existsSync, mkdirSync } from 'fs';

export default (collection) => {
    
    if (!collection) throw new Error('Can not find collection');
    
    if (existsSync('./output')) {
        return writeFileSync(`./output/${collection.name}.csv`, JSON.stringify(collection.documents), 'utf-8');
    } else {
        mkdirSync('./output');
        return writeFileSync(`./output/${collection.name}.csv`, JSON.stringify(collection.documents), 'utf-8');
    }
}