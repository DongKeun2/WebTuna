# README.md

![logo2](/uploads/d4335d16ba0c48cdc17dd821525f016c/logo2.png)


# WebTuna: 웹툰 추천 플랫폼

### 팀명: 툰툰이들

### 서비스명: 웹투나(WebTuna)

### 진행 기간

2022.08.29 ~ 2022.10.07(금) / 6주

### 기획 배경

 코로나19로 웹툰 이용자 수가 급증하여 한 달에 1000만명 수준인 상황. 그리고 사람들이 이용하는 웹툰 플랫폼에서는 저마다의 추천을 해주고 있지만, 설문조사 결과 현재 웹툰 이용자의 세 명중 두 명 정도는 추천 서비스를 이용하지 않고 있다. 그리고 그 이유에는 추천 서비스에 만족하지 못하는 여러 가지 이유 들이 있는데 그 이유는 다음과 같다.

1위. 내가 보는 것과 상관 없는 홍보성 웹툰 추천(44%)

2위. 추천해서 봤지만 막상 재미없는 웹툰 (43%)

3위. 불편한 UI (25%)

  이런 이유들로 추천 서비스를 이용하지 않는 사람들이 많았고, 설문조사 결과 적절한 웹툰 추천 서비스가 있다면 이용하겠다는 사용자의 비율이 무려 70%에 달했다. 우리 툰툰이들은 위의 문제점을 해결해서 더 깔끔하고 더 정확한 웹툰 추천 서비스를 제공하고 싶었고, 그것이 ‘웹투나(Webtuna)’가 세상에 등장한 배경이다. 서비스명 웹투나는 웹툰(Webtoon)과 참치(Tuna)의 합성어로, 세상의 모든 웹툰이 담긴 바닷속을 누비는 툰툰이라는 참치 캐릭터가 사용자에게 맞춤형 웹툰을 찾아준다는 컨셉이다.바다처럼 수 많은 웹툰을 보유하고 또 추천해주기 위해서 네이버, 카카오웹툰, 카카오페이지 의 모든 웹툰들을 웹투나 한 곳에서 추천 받을 수 있다. 

그리고 설문조사 결과 사람들이 웹툰을 선정하는 기준의 순위는 다음과 같다.

1위. 스토리(85%)

2위. 그림체(64%)

3위. 장르(47%)

4위. 작가(35%)

 현재 다양한 웹툰 플랫폼에서 여러 방법으로 추천해주고 있지만, 웹투나에서는 기존 플랫폼들과 차별화를 두기 위해 그림체를 주력으로 추천해준다. 메인페이지에서 그림체를 기반으로 추천해주는것을 기본으로, 툰툰이의 추천페이지에서는 그림체 외에도, 장르, 기반, 연령대 등 다양한 추천을 제공해준다. 이런 추천 기능들은 기존의 웹툰 플랫폼에 있는 것이라고 생각할 수 있지만, 기존 추천은 플랫폼 내부에서만 추천을 해주고 다른 플랫폼은 추천을 해주지 않는다. 하지만 웹투나에서는 다양한 플랫폼에서 비슷한 그림체, 장르, 태그 등으로 추천을 받을 수 있기 때문에 새로운 작품을 더 많이 접할 수 있다.

### 서비스 설명

머신러닝을 활용해 자체적으로 분류한 6가지 그림체를 기반으로 사용자가 선호하는 그림체를 분석하여 웹툰을 추천한다.

### 기술 특장점

CNN을 활용한 웹툰 그림체 분류

teachablemachine을 활용한 실시간 데이터 분석

CF, CBF 기반 추천 알고리즘
Chart.js를 활용한 데이터 시각화
모바일, PC 모두 최적화된 반응형 웹 페이지 제공

## 주요 기능

### 회원가입 시 선호 그림체 선택

![회원가입](/uploads/67b0286453c7c9d488a8cec5a2ff6066/회원가입.gif)

콜드스타트 문제를 방지하기 위해 사전 선호 그림체를 수집한다.

### 메인 페이지

![메인페이지](/uploads/a2d750334fa6755901063f4f681aa5bf/메인페이지.gif)

6가지 그림체 별로 실시간 인기 TOP5 웹툰을 전시한다.

### 추천 페이지

![추천](/uploads/5aa7d47b6e081c737f75b5d3faf5098b/추천.gif)

Collaborative Filtering(Item-based Filtering & User-based Filtering) 추천

선호 그림체 기반 / 선호 장르 기반 / 선호 태그 기반 / 오늘 날씨 기반 등 6가지 추천 방식을 통해 사용자에게 알맞은 웹툰을 추천한다.

### 명탐정 툰툰이

![명탐정툰툰](/uploads/21fab027ed69add64788fdef42a72ffd/명탐정툰툰.gif)

유저가 업로드한 파일의 그림체를 분석하여 학습시킨 데이터를 뽑아내고 유사도가 높은 웹툰을 찾아준다.

### ToonBTI

![toonbti](/uploads/9e62b1894a139d584bd7a60bccd09741/toonbti.gif)

다양한 질문을 통해 유저의 성향을 파악한 뒤, 그것을 기준으로 다양한 웹툰을 추천해준다.

### 태그 찜 추가 및 삭제

![태그](/uploads/13bf0dd348eea494830e2e9ce4c957de/태그.gif)

웹툰마다 존재하는 태그들 중 좋아하는 태그를 찜하여 유저의 취향기반 알고리즘에 사용한다.

프로필 페이지에서 찜 삭제와 검색을 통해 찜 추가도 가능하다. 

### 웹툰 상세 정보

![디테일페이지](/uploads/f5e1d255c898d184881958d88fc6835a/디테일페이지.gif)

웹툰의 작가와 장르 및 줄거리와 같은 기본정보와 태그와 별점, 해당 웹툰을 선호하는 유저들의 정보를 포함한 다양한 분석 그래프도 함께 제공한다.

또한 웹툰 보러가기를 통해 해당 웹툰으로 직접 이동이 가능하다.

## 개발 환경

### 주요 기술 스택

**FrontEnd**

- React
- Redux-toolkit
- mui
- styled-components

**BackEnd**

- Django
- Tensorflow
- MySQL
- beautifulsoup
- JWT

**배포**

- AWS-RDS
- Ubuntu
- Jenkins
- Nginx

## 서버 아키텍처

![아키텍처](/uploads/15c59549c506dd5cc26ed55e83fdd8d6/아키텍처.png)

## 프로젝트 명 : 웹투나

## 팀 소개

### 역할

<<<<<<< HEAD
<<<<<<< HEAD
- 김민성 : BE
- 김영준 : FE / 팀장
- 김우석 : BE / Data 추출 및 분석
- 배윤호 : FE / 팀원 1일 1커밋
- 이동근 : FE
- 이홍주 : BE / 배포
=======
김영준 : FrontEnd, 팀장, UI/UX
김민성 : BackEnd, DataBase 관리
김우석 : BackEnd, ML, 발표
배윤호 : FrontEnd, 비즈니스 로직 설계, 기록물 관리
이동근 : FrontEnd, 컴포넌트 설계, 일정 관리
이홍주 : BackEnd, 배포, 디자인
=======
<table>
    <tr>
        <td height="140px" align="center">
            <img src="/uploads/a5d79076583fe2333a635d6b4eae7daf/김영준.jpg" width="140px" /> <br><br> 👑 김영준 <br>(Front-End) </a> <br></td>
        <td height="140px" align="center">
            <img src="/uploads/0934f722c4124be33805f003cfcdc532/이동근.jpg" width="140px" /> <br><br> 🙂 이동근 <br>(Front-End) </a> <br></td>
        <td height="140px" align="center">
            <img src="/uploads/51d3e99dbbaecdb19c4f48c82c8fa4bf/배윤호.jpg" width="140px" /> <br><br> 😆 배윤호 <br>(Front-End) </a> <br></td>
        <td height="140px" align="center">
            <img src="/uploads/2de9c544b4221bafa500a6ae52ec3fed/김민성.jpg" width="140px" /> <br><br> 😁 김민성 <br>(Back-End) </a> <br></td>
        <td height="140px" align="center">
            <img src="/uploads/1e655808d8a5b14f7490abc6ad43203e/김우석.jpg" width="140px" /> <br><br> 🙄 김우석 <br>(Back-End) </a> <br></td>
        <td height="140px" align="center">
            <img src="/uploads/43ea7316184eca09106a91e0198f289d/이홍주.jpg" width="140px" /> <br><br> 😶 이홍주 <br>(Back-End) </a> <br></td>
    </tr>
    <tr>
        <td align="center">UI/UX<br/>React<br/>팀장<br/>페이지 반응형</td>
        <td align="center">UI/UX<br/>React<br/>컴포넌트설계<br/>일정관리</td>
        <td align="center">UI/UX<br/>React<br/>비즈니스 로직 설계<br/>기록물 관리</td>
        <td align="center">Django<br/>REST API<br/>DB</td>
        <td align="center">Django<br/>REST API<br/>ML<br/>발표</td>
        <td align="center">Django<br/>REST API<br/>배포<br/>디자인</td>
    </tr>
</table>
>>>>>>> 22e474c (fix:readme)

<<<<<<< HEAD


# 위키에 넣을 내용 (추후 작성O)

- 시연 시나리오 (모든 기능)


[웹툰원정대ERD (erdcloud.com)](https://www.erdcloud.com/d/Sd7QG6pyrNQ8bEYFN)

[와이어프레임.pptx - Google Slides](https://docs.google.com/presentation/d/1lls6BrnZksCDGVXeZn-ehaxjNcrOqQno/edit#slide=id.g150220aeff0_3_214)

[Webtuna – Figma](https://www.figma.com/file/a9LicgltWtTQe5dRMRP05N/Webtuna?node-id=0%3A1)

## 시연 시나리오

### 회원가입
![회원가입](/uploads/67b0286453c7c9d488a8cec5a2ff6066/회원가입.gif)

### 로그인
![로그인](/uploads/9f123931645a75317bfdfb7099f0fa97/로그인.gif)

### 로그아웃
![로그아웃](/uploads/11aa282ad4667222a4d495fa0b450951/로그아웃.gif)

### 정보 수정
![정보수정](/uploads/ace3fa553deeec024c55af26824f38ad/정보수정.gif)

### 오늘의 운세
![오늘의운세](/uploads/bd9c81ca87c3787f48f7887a475905ea/오늘의운세.gif)

### 메인 추천 페이지
![메인추천페이지](/uploads/cd92f7f6fa8c8b13b84d4db1c1c3c21c/메인추천페이지.gif)

### 검색 기능
![검색](/uploads/58cd4eaa25919e09c4e02ea45a0010ff/검색.gif)

### 필터 검색
![필터](/uploads/86786cce9c13d5becae8b5fbb8a48169/필터.gif)

### 웹툰 디테일 페이지
![디테일페이지](/uploads/f5e1d255c898d184881958d88fc6835a/디테일페이지.gif)

### 프로필 페이지
![프로필페이지](/uploads/0adbee5e1f7f1518acdcd902eeafc7bd/프로필페이지.gif)

### 명탐정 툰툰 페이지
![명탐정툰툰](/uploads/21fab027ed69add64788fdef42a72ffd/명탐정툰툰.gif)

### ToonBTI 페이지
![toonbti](/uploads/9e62b1894a139d584bd7a60bccd09741/toonbti.gif)

## 서비스 설계

### 1. 와이어 프레임 [🔗](https://docs.google.com/presentation/d/1lls6BrnZksCDGVXeZn-ehaxjNcrOqQno/edit#slide=id.g150220aeff0_3_214)

![와이어프레임](/uploads/8142c0222ae61d5aee881db1abbeb845/와이어프레임.png)

### 2. Figma [🔗](https://www.figma.com/file/a9LicgltWtTQe5dRMRP05N/Webtuna?node-id=0%3A1)

![figma](/uploads/55caedd4178336aad5c0a0fadb6b0afe/figma.png)

### 3. ERD

![erd](/uploads/75ae91e1db0837ecbc0f4bdd9571810a/erd.png)

## 협업

### 1. Git

- 노션에 Git 컨벤션을 설정하였습니다.
- 각자 맡은 기능에 맞게 `front`, `back` 에서 브랜치를 생성하고 기능 구현을 완료하면  다시`front`, `back` 브랜치로 머지 했습니다. 일정 주기로 `develop` 브랜치로 프론트와 백을 통합하였습니다.
- 현재 feat-b/deploy에 front, back 브랜치를 머지하고 Jenkins로 자동 빌드 및 배포중입니다.
- 충돌 상황을 최소화하기 위해 깃 푸시를 하기 전 공유를 하였습니다.
    

### 2. JIRA

- 팀원들과의 목표 공유를 위하여, 협업 툴로 JIRA를 사용하였습니다.
- FE, BE 등의 라벨을 추가하여, 각 파트의 할 일을 한눈에 볼 수 있도록 했습니다.
- 매주 월요일 마다 백로그에 이슈들을 생성한 후 스프린트를 시작하였습니다.

![jira](/uploads/92c7d754af10ab4fa1708c6c32fc39f5/jira.png)

## 3. **Notion** [📎](https://www.notion.so/A403-4a1acd3d850f44f0aed8765d6056cfd2)

- 팀원들 간에 공유해야할 자료들은 노션에 백업하여 불필요한 소통을 줄였습니다.
- 프로젝트 종료 후에도 리마인드하기 쉽도록, 사용한 기술들이나 개발 과정에서 고민했던 부분들 또한 백업하였습니다.

![notion](/uploads/ccbc08dfad76293b736eea00a4bd66a6/notion.png)

![notion2](/uploads/c9aa6ce9a57fc8d98169dfb12336e089/notion2.png)

## 4. 소감

- 김영준
- 김민성
- 김우석
- 배윤호
- 이동근
- 이홍주
>>>>>>> 9dfc6cf (fix:readme)
=======
>>>>>>> 7cac67c (Update README.md)
