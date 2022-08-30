# SSAFY Bigdata project

## How to Run

### Sub1

```sh
cd sub1
pip install -r requirements.txt
python parse.py
python analyze.py
python visualize.py
```

### Sub 2

**Backend**

```sh
cd sub2/backend
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py initialize
python manage.py runserver
```

**Frontend**

```sh
cd sub2/frontend
npm install
npm run serve
```

### data file
  * 기본 제공 데이터: 맛집 데이터
    - 다운로드 링크: https://lab.ssafy.com/s07-common-files/bigdata-review-data/-/blob/master/data.zip
    - PW: ssafy2022!@#$
  * 추가 제공 데이터: 카드사 데이터
    - 다운로드 링크: https://lab.ssafy.com/s07-common-files/bigdata-card-data/-/blob/master/card-data.zip
    - PW: ssafy2022!@#$

** SSAFY에서 제공하는 기업 데이터는 프로젝트 외에 다른 목적으로 사용할 수 없으며, 데이터 원본 파일의 외부 반출을 금합니다.**

