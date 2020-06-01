import {
    writeFileSync,
    appendFileSync,
    existsSync,
    mkdirSync,
    unlinkSync
} from 'fs';
import { OptionModel, CollectionModel } from './Interface';

// csv file format
const convertToCsvFormat = (arrayObj: Array<object>, split: string): string => {
    let str = '';

    for (let i = 0; i < arrayObj.length; i++) {
        let line = '';

        for (let index in arrayObj[i]) {
            if (line !== '') line += split || ',';
            line += arrayObj[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

export const generateCSV = (collection: CollectionModel, option: OptionModel): string => {
    
    if (!collection) throw new Error('Can not find collection');
    
    const outputPath = option.outputPath || './output'
    const filePath: string = `${outputPath}/${collection.name}.csv`;

    try {

        if (collection.documents.length < 1) {
            return `${collection.name} EMPTY`;
        }

        // output이 없다면 생성
        if (!existsSync(outputPath)) {
            mkdirSync(outputPath);
        }

        // 기존에 레거시 파일이 있다면 그냥 삭제
        if (existsSync(filePath)) {
            unlinkSync(filePath);
        }
        
        writeFileSync(filePath, '', option.charSet || 'utf-8');
        appendFileSync(filePath, convertToCsvFormat(collection.documents, option.split));

        return `${collection.name} DONE`;

    } catch(e) {
        throw new Error(`File Error = ${e}`);
    }
};