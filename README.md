<div align="center">

![header](https://capsule-render.vercel.app/api?type=waving&color=387FFD&height=220&section=header&text=Bluekey%20Payment%20System&animation=fadeIn&fontSize=60&fontColor=ffffff)

[![GitHub Stars](https://img.shields.io/github/stars/Bluekey-Payment-System/BPS-FE?style=for-the-badge)](https://github.com/Bluekey-Payment-System/BPS-FE/stargazers) [![GitHub Issues](https://img.shields.io/github/issues/Bluekey-Payment-System/BPS-FE?style=for-the-badge)](https://github.com/Bluekey-Payment-System/BPS-FE/issues) [![Current Version](https://img.shields.io/badge/version-1.0.0-black?style=for-the-badge)](https://github.com/Bluekey-Payment-System/BPS-FE) [![GitHub License](https://img.shields.io/github/license/Bluekey-Payment-System/BPS-FE?style=for-the-badge)](https://github.com/Bluekey-Payment-System/BPS-FE/blob/main/LICENSE)

<hr>

</div>

### Demo

[Bluekey Payment System](https://bluekeyinsight.net/)

## 프로젝트 소개

<div align="center">

<img width="400" alt="bluekey insight" src="https://github.com/Bluekey-Payment-System/BPS-FE/assets/78773781/6a949269-bba7-49c0-8b43-a15704f0a9db">

<br />

<img width="1200" alt="어드민 대쉬보드" src="https://github.com/Bluekey-Payment-System/BPS-FE/assets/78773781/8dea1f47-b275-4f7e-920a-26c4abbcf44d">

</div>

### 개요

음악 제작사(블루키뮤직)와 계약 아티스트 간의 정산 세부 내역 및 현황을 투명하게 공개하고, 매출 추이 등의 통계 지표를 볼 수 있는 정산 플랫폼 사이트입니다.

### 주요 기능 소개

**어드민**

- **어드민 / 아티스트 / 앨범 대쉬보드** - 당월 총 매출액, 회사 이익, 정산액, 대표 아티스트 및 앨범 트랙 등, 음악 제작사 측이 볼 수 있는 정보들을 한 눈에 파악할 수 있습니다.
- **아티스트 현황** - 아티스트별로 매출액, 회사 이익, 정산액, 대표곡, 전월 대비 상승/하락율 정보를 테이블로 정리하여 볼 수 있습니다.
- **등록** - 아티스트 등록, 앨범 및 수록곡 등록을 할 수 있습니다.
- **앨범 탐색** - 앨범별로 상세 정보에 접근하거나 수정 및 삭제를 할 수 있습니다.
- **정산 내역 업로드** - 정산 내역을 업로드할 수 있습니다. 또 기존에 업로드된 정산 내역들을 테이블로 정리하여 볼 수 있고, 여기서 내역을 삭제할 수 있습니다.
- **아티스트 계정 관리** - 아티스트 유저의 비밀번호를 재발급하거나 계정 탈퇴 등의 관리를 할 수 있습니다. 슈퍼 어드민의 경우 추가적으로 어드민 유저들의 계정 관리가 가능합니다.
- **내 프로필** - 프로필 정보를 확인하고 수정할 수 있습니다.

**아티스트**

- **아티스트 / 앨범 대쉬보드** - 본인이 참여한 트랙에 한하여 당월 정산액, 당월 베스트 앨범 및 트랙, 앨범 정산액 등의 정보를 한 눈에 파악할 수 있습니다.
- **앨범 탐색** - 본인이 참여한 앨범들의 목록을 볼 수 있고, 앨범 상세 정보에 접근할 수 있습니다.
- **내 프로필** - 프로필 정보를 확인하고 수정할 수 있습니다.

### 목표

- 포맷이 서로 다른 유통사의 정산 내역 데이터를 서버에 통합시켜 저장함으로써 **정산 시스템 자동화 및 정산 내역을 투명하게 공개**
- 최근 6개월 간의 아티스트별, 앨범별, 트랙별 정산 내역을 시각화한 통계자료 등의 **인사이트 제공**
- 음악 제작사 측은 서로 다른 정산 데이터 포맷을 한 곳에 업로드하기만 하면 되는 **간편함**
- 어드민과 아티스트 유저를 엄격하게 구분하여 타인에게 **개인 정보 유출 방지**

### 기술적 성취

- 디자이너, 백엔드 팀과 **비동기적 소통 및 협업 경험**
- `react-query`를 이용해 api 커스텀 훅을 제작하여 **DX 향상** & prefetch를 통해 **UX 향상** 꾀함
- `react-hook-form`을 이용해 재렌더링을 최소화시켜 **마운팅 속도 증가**
- `react-query`로 **서버 상태**를 관리하고, `redux-toolkit`을 이용해 **클라이언트 상태를 효율적으로 관리**
- `jest` 테스트 라이브러리를 이용하여 **UI 컴포넌트의 테스트 자동화**를 진행
- **CI/CD 파이프라인 구축** 경험

### Tech Stacks

**Language**<br />
![TypeScript](https://img.shields.io/badge/typescript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

**Framework**<br />
![NextJS](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)

**CSS**<br />
![Sass](https://img.shields.io/badge/sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)

**State Management Tool**<br />
![ReduxToolkit](https://img.shields.io/badge/redux_toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)

**Testing**<br />
![Jest](https://img.shields.io/badge/jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Testing Library](https://img.shields.io/badge/testing_library-E33332?style=for-the-badge&logo=testinglibrary&logoColor=white)

**Colaboration Tool**<br />
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Notion](https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white)
![Jira](https://img.shields.io/badge/jira-0052CC?style=for-the-badge&logo=jira&logoColor=white)
![Slack](https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)

**Version Contorl**<br />
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

**API**<br />
![Axios](https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

**Library**<br />
![ReactQuery](https://img.shields.io/badge/react_query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Nivo](https://img.shields.io/badge/Nivo-green?style=for-the-badge)
![ReactCSV](https://img.shields.io/badge/react_csv-blue?style=for-the-badge)
![React Hook Form](https://img.shields.io/badge/react_hook_form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)

**Deployment**<br>
![Amazon EC2](https://img.shields.io/badge/amazon_ec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white)

**Others**<br />
![Eslint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)

## Contributors

| [🤑 조세영](https://github.com/SeyoungCho) | [🎸 김연우](https://github.com/drizzle96) | [🐯 나하영](https://github.com/hayoung-99) | [🥝 임병욱](https://github.com/wookki) |
| ------------------------------------------ | ----------------------------------------- | ------------------------------------------ | -------------------------------------- |

### [🤑 조세영](https://github.com/SeyoungCho)

### 공용 토스트, 모달 컴포넌트 제작

- 커스텀 훅 제작으로 DX 증진
- `redux-toolkit`의 클라이언트 상태 관리를 통해 state 선언 중복 코드 제거

<img width="440" alt="토스트" src="https://github.com/Bluekey-Payment-System/BPS-FE/assets/78773781/57c73d83-6e7a-4326-b963-b68fc23e1d84">

### 폼 관련 컴포넌트 개발

- `react-hook-form`을 이용한 유효성 검사 로직 연동
- 프로필 이미지 파일 업로드 기능 개발
- submit시 api 호출 및 에러 로직 개발

<img width="440" alt="에러 알림 모달" src="https://github.com/Bluekey-Payment-System/BPS-FE/assets/78773781/e5323540-58a9-49ff-ab1d-47ec63a15874">

### CI/CD 파이프라인 및 배포 인프라 구축

<img width="800" alt="배포 플로우" src="https://github.com/Bluekey-Payment-System/BPS-FE/assets/78773781/bb61a1a2-bb83-4b19-a33b-16c8e423e1bd">

### 유닛 테스트 코드 작성

- `Jest`와 `react-testing-library`를 이용
- input, toast 등 공용 컴포넌트 테스트
<hr />

### [🎸 김연우](https://github.com/drizzle96)

### 공용 버튼 컴포넌트 제작

- `ButtonHTMLAttributes` 타입을 상속하여 button 태그의 `intrinsic` 속성 사용할 수 있도록 개발

### 공용 테이블 컴포넌트 제작

- 높은 활용도를 위해 컴포지션 형태로 제작
- 테이블 헤더/첫 열/마지막 열에 선택적 `sticky` 속성 부여 가능
- width가 부족할 때 스크롤에 따라 `shadow` 스타일 적용되도록 구현, 이 때 스로틀링으로 과도한 이벤트 호출 방지

<img width="550" alt="테이블" src="https://github.com/Bluekey-Payment-System/BPS-FE/assets/78773781/a1a4d294-3bfc-4da2-9230-9c8a9ab27e71">

### 페이지네이션 기능 개발

- URL Query Param을 이용해 page number를 표시하고, Query Param명을 받을 수 있도록 구현
- `react-query` 라이브러리를 활용한 페이지네이션 prefetch 적용

### 에러 바운더리 구현

- 에러 발생 시, 에러 Fallback 페이지로 이동하도록 설정
- 에러 코드, 메시지를 에러 페이지에 렌더링

<img width="800" alt="에러 페이지" src="https://github.com/Bluekey-Payment-System/BPS-FE/assets/78773781/a8773c22-07ea-4101-a364-ebe7803f551a">

### API 함수 제작 (with. 나하영)

- `Axios` 인스턴스 및 이를 활용한 api 함수 제작
- api 인터페이스 타입 제작
- `react-query` 라이브러리를 활용해 api 커스텀 훅 제작

<img width="540" alt="API 커스텀 훅 구조" src="https://github.com/Bluekey-Payment-System/BPS-FE/assets/78773781/7aac6cd3-9fbe-4453-b7c7-299269585ff6">

<img width="540" alt="API 커스텀 훅 구조" src="https://github.com/Bluekey-Payment-System/BPS-FE/assets/78773781/cd1e40ef-fe98-457c-bd6c-1aacde6836d6">

<hr />

### [🐯 나하영](https://github.com/hayoung-99)

### 공용 툴팁 컴포넌트 개발

- text overflow가 발생하는 영역에 대해 툴팁 컴포넌트 활용
- text overflow 발생 여부 확인하는 로직 개발

<img width="440" alt="툴팁" src="https://github.com/Bluekey-Payment-System/BPS-FE/assets/78773781/eedb828e-9ee5-4bad-900b-7d55d32e6b68">

### 정산 내역 업로드 페이지 개발

- 엑셀 파일 업로드용 드래그 앤 드롭 컴포넌트 제작
- 정산 내역 GET, POST, DELETE API 연동
- `.xlsx`, `.xls` 파일 확장자 제한 기능 개발
- `react-csv`를 이용한 문제있는 정산 데이터를 CSV 파일로 다운로드 할 수 있는 기능 개발

<img width="600" alt="경고 데이터 모달" src="https://github.com/Bluekey-Payment-System/BPS-FE/assets/78773781/a596b288-3018-4943-8209-f5aead976464">

### 프로필 기본 이미지 컴포넌트 제작

- 프로필 이미지가 없는 유저에 한해, 유저의 로그인 아이디를 이용한 기본 이미지 생성
- `boring-avatars` 라이브러리 활용

<img width="300" alt="기본 프로필 이미지" src="https://github.com/Bluekey-Payment-System/BPS-FE/assets/78773781/7581429b-8fb4-4456-8251-e4253460cbbd">

###

<hr />

### [🥝 임병욱](https://github.com/wookki)
