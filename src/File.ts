import {
    writeFileSync,
    appendFileSync,
    existsSync,
    mkdirSync,
    unlinkSync
} from 'fs';

// csv file format
const convertToCsvFormat = (arrayObj: Array<object>) => {
    let str = '';

    for (let i = 0; i < arrayObj.length; i++) {
        let line = '';

        for (let index in arrayObj[i]) {
            if (line !== '') line += ','

            line += arrayObj[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

export const generateCSV = (collection: {name: string, documents: Array<object>}) => {
    
    if (!collection) throw new Error('Can not find collection');
    
    const filePath: string = `./output/${collection.name}.csv`;

    try {

        if (collection.documents.length < 1) {
            return `${collection.name} EMPTY`;
        }

        // output이 없다면 생성
        if (!existsSync('./output')) {
            mkdirSync('./output');
        }

        // 기존에 레거시 파일이 있다면 그냥 삭제
        if (existsSync(filePath)) {
            unlinkSync(filePath);
        }

        writeFileSync(filePath, '', 'utf-8');
        appendFileSync(filePath, convertToCsvFormat(collection.documents));

        return `${collection.name} DONE`;

    } catch(e) {
        throw new Error(`File Error = ${e}`);
    }
};