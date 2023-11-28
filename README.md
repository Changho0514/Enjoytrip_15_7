# 🛫 여행선호
지구는 너뿐이 아니야, 너와 함께하는 여정

## 프로젝트 소개
> 여행을 사랑하는 모두를 위한 웹사이트

여행을 가기전 여행 계획을 세우기 위해서는 후기를 찾아보고 지도에 위치를 본 후 여행경로를 설정해야합니다. 여러 사이트를 돌아다니지 않고 한 사이트에서 가능하도록 하는 것을 목표로 제작된 웹 사이트 입니다

- 여행자들은 자신의 여행 일정을 세우고, 다양한 관광지 정보를 찾아보며 최적의 여행 경로를 설정
- 한국관광공사에서 제공하는 지역별 관광지 정보를 활용하여 다양한 관광 명소를 탐색
- 관광지에 따른 핫플레이스를 활용하여 좋아요를 누르고, 이를 마이페이지에서 볼 수 있음
- 여행을 갈 때 동행 게시판을 활용하여 동행 구함

## 👨‍👦 팀원소개
<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/Changho0514"><img src="https://avatars.githubusercontent.com/u/86104813?v=4" width="100px;" alt=""/><br /><sub><b>팀장 : 최창호</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/0o0mlb"><img src="https://avatars.githubusercontent.com/u/81353217?v=4" width="100px;" alt=""/><br /><sub><b>팀원 : 윤선아</b></sub></a><br /></td>
    </tr>
  </tbody>
</table>


## 📅 개발기간
23.11.13 ~ 23.11.23


## 🛠 기술스택
### ✔️Frond-end
 <img src="https://img.shields.io/badge/vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white"> <img src="https://img.shields.io/badge/vuetify-1867C0?style=for-the-badge&logo=vuetify&logoColor=white"> 
<img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">
<img src="https://img.shields.io/badge/kakaoMap-FFCD00?style=for-the-badge&logo=kakaoMap&logoColor=white">
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">

### ✔️Back-end
<img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> <img src="https://img.shields.io/badge/swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=white">
<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
<img src="https://img.shields.io/badge/apachetomcat-F8DC751?style=for-the-badge&logo=apachetomcat&logoColor=white">

### ✔️Tool
<img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/visualstudiocode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">

## 🎞 아키텍처
![아키텍쳐](https://github.com/0o0mlb/EnjoyTrip_seoul15_7/blob/main/img/flow.JPG)

## 💻 주요 기능
### 1. 메인페이지
![메인페이지](https://github.com/0o0mlb/EnjoyTrip_seoul15_7/blob/main/img/main.gif)
- Vuetify 라이브러리를 이용해 Carousel component를 생성하였습니다
- API를 호출하여 현재 날씨를 제공하고, 지역별 상세 날씨를 조회할 경우 향후 3일간의 날씨를 조회할 수 있습니다
- 본 서비스의 4가지 메인 기능 탭입니다. 클릭시 메인화면에 개략적으로 출력된 각 컴포넌트로 이동합니다

### 2. 나의여행계획
![관광지](https://github.com/0o0mlb/EnjoyTrip_seoul15_7/blob/main/img/attractioni.gif)
- 지역별 관광지를 ‘시도별’, ‘구군별’, ‘유형별’, ‘이름’ 으로 검색할 수 있습니다.
- 일자와 메모를 추가해 여행 계획을 추가할 수 있고, 문제 발생시 초기화 할 수 있습니다.
- 마커를 누르면 계획을 추가할 수 있습니다.
- 카드를 누르면 해당 마커로 이동합니다.
- 추가한 계획을 볼 수 있습니다. 메모해 둔 내용 / 일자 정보가 표시됩니다.
- 계획해 둔 일정대로 경로 조회가 가능합니다. 개략적인 예상 시간도 확인할 수 있습니다.
- 추가한 계획 별로 탭이 나뉩니다.
- 타임라인을 통해 계획을 확인할 수 있습니다

### 3. 핫플레이스
![핫플](https://github.com/0o0mlb/EnjoyTrip_seoul15_7/blob/main/img/hotplace.gif)
- 핫플레이스를 등록합니다. 사진을 올릴 수 있고, 올릴 사진에 대한 미리보기가 가능합니다.
- 핫플레이스는 좋아요순, 최신순으로 정렬됩니다
- 제목, 작성자, 주소 별로 검색이 가능합니다.
- 내가 좋아요를 누른 핫플레이스에 대한 조회가 가능합니다.

### 4. 동행게시판
![게시판](https://github.com/0o0mlb/EnjoyTrip_seoul15_7/blob/main/img/board.gif)
- 동행을 모집하는 글을 작성합니다. 마커를 선택하고 정보를 입력합니다
- 댓글을 통해 모집의사를 표현할 수 있습니다.
- 관리자의 글은 공지사항으로 표시되며, 일반 사용자의 글은 흰색으로 표현됩니다. 

### 5. 일반회원
![회원](https://github.com/0o0mlb/EnjoyTrip_seoul15_7/blob/main/img/user.gif)
- JWT 토큰 인증 기반으로 로그인과 회원 가입을 구현하여 Access Token 만료시 재로그인을 요구합니다
- 입력에 따라 실시간으로 아이디/비밀번호 유효성 및 중복 검사를 합니다
- 회원 가입시 프로필 사진을 등록할 수 있도록 합니다
- 회원정보 수정을 통해 닉네임을 변경할 수 있고, (비밀번호 찾기), 변경이 가능합니다. 프로필 사진도 수정이 가능합니다

### 6. 관리자
![관리자](https://github.com/0o0mlb/EnjoyTrip_seoul15_7/blob/main/img/admin.gif)
- 관리자 권한을 가진 유저는 모든 회원 정보를 조회할 수 있습니다
- 유사시 강제 탈퇴를 시킬 수 있습니다
- 특정 회원의 게시글, 댓글 활동내용을 볼 수 있습니다

## 📈 ERD
![db](https://github.com/0o0mlb/EnjoyTrip_seoul15_7/blob/main/img/db.png)

## 📍 클래스 다이어그램
<details>
    <summary>attraction</summary>

![관광지](https://github.com/0o0mlb/EnjoyTrip_seoul15_7/blob/main/img/attraction.png)
</details>

<details>
    <summary>user</summary>

![유저](https://github.com/0o0mlb/EnjoyTrip_seoul15_7/blob/main/img/user.png)
</details>

<details>
    <summary>mytrip</summary>

![계획](https://github.com/0o0mlb/EnjoyTrip_seoul15_7/blob/main/img/mytrip.png)
</details>

<details>
    <summary>hotplace</summary>

![핫플레이스](https://github.com/0o0mlb/EnjoyTrip_seoul15_7/blob/main/img/hotplace.png)
</details>

<details>
    <summary>board</summary>

![게시판](https://github.com/0o0mlb/EnjoyTrip_seoul15_7/blob/main/img/board.png)
</details>

<details>
    <summary>comment</summary>

![댓글](https://github.com/0o0mlb/EnjoyTrip_seoul15_7/blob/main/img/comment.png)
</details>

## Swagger API
