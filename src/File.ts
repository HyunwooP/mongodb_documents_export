import fs from 'fs';

export default (document: object) => {
    
    if (!document) throw new Error('Can not find document');
    
    return fs.writeFile('./test.csv', document);
}