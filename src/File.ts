import { writeFileSync, createWriteStream, appendFileSync, existsSync, mkdirSync, closeSync } from 'fs';

export default (collection) => {
    
    if (!collection) throw new Error('Can not find collection');
    
    if (!existsSync('./output')) {
        mkdirSync('./output');
    }
    
    // todo = 한번에 일괄 작성하려니 메모리 렉난다. worker에서 쪼개서 append하자.
    const fs = createWriteStream(`./output/${collection.name}.csv`, { encoding: 'utf16le' });
    fs.write(JSON.stringify(collection.documents));
    fs.end();
}

