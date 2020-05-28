## MongoDB Documents Export Module
```
2020.05.20
Author: 박현우
```

# EXPORT
* MongoDB에서 무료 export tool 찾기가 좀 귀찮아서 만들어봄.
* 그나마 한개 찾은거 utf-8 지원 안해주네...

# 필독!!
* mongo url을 넣어주세요!

1. 프로젝트 구조
```
--------- src
------------- File.ts - CSV 파일 생성
------------- Mongo.ts - connection 및 MongoDB 데이터 축출
------------- Worker.ts - entry point
------------- Interface.ts - 인터페이스 정의
```

# OPTION
```

default option
- split: ','
- charSet: 'utf-8'
- outputPath: './output'

const
- url

const option: OptionModel = {
    split: '\t', // or ','
    url: 'mongodb://localhost:27017',
    charSet: 'utf-8',
    target: ['collection name'],
    outputPath: './output
};
```

# START
```
Worker(option)
.then(res=> {
    console.log(res);
    return res;
});

or

const result = await Worker(option);
```

# OUTPUT
```
DONE = document in file
EMPTY = document is empty
[
    'collection1 DONE',
    'collection2 EMPTY',
]

./output/collection_name.csv

```