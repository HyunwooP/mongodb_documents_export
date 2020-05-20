import Mongo from './Mongo';
import File from './File';

const worker = async () => {
    const collectionsDocuments: Array<object> = await Mongo('mongodb://localhost:27017/local', {});
    
    if (collectionsDocuments.length > 0) {
        
        // todo: 콜렉션별 도큐먼트를 fs writeFile로 csv 떨구기
        // todo: 모든 도큐먼트 뽑아내느냐 or 타겟 도큐먼트를 뽑아내느냐의 기능 추가
        // todo: 프로젝트 정리
    }
}

worker();