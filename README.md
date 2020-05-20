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
{
	src: {
		Worker.ts: entry point,
		Mongo: MongoDB 데이터 축출,
		File: 파일 작성,
	},
}
```