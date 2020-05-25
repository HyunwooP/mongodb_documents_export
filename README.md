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

3. 프로젝트 구조
```
--------- src
------------- File.ts - CSV 파일 생성
------------- Mongo.ts - connection 및 MongoDB 데이터 축출
------------- Worker.ts - entry point
```

# 추가 업데이트 해야할 것
* 특정 Collection만 뽑아서 export하기
* Character Set 동적 제어
* tab으로 자르는 방식도 지원
* 퍼센테이지 표시