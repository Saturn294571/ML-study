# 웹 프론트엔드 (HTML, CSS, JS) 기본

- 참고자료
  - 주 레퍼런스 [MDN 가이드라인](https://developer.mozilla.org/ko/docs/Learn_web_development/Getting_started/Your_first_website)
    - [HTML 기본](https://developer.mozilla.org/ko/docs/Learn_web_development/Getting_started/Your_first_website/Creating_the_content)
    - [CSS 기초](https://developer.mozilla.org/ko/docs/Learn_web_development/Getting_started/Your_first_website/Styling_the_content)
    - [JavaScript 기본](https://developer.mozilla.org/ko/docs/Learn_web_development/Getting_started/Your_first_website/Adding_interactivity)
  - 보조 레퍼런스 [생활코딩 web1](https://opentutorials.org/course/3084)
  - 레이아웃 참고 [OverTheWire Wargames](https://overthewire.org/wargames/) : 왼쪽 내비게이션과 오른쪽 콘텐츠 구성 참고. 메뉴 내용과 코드는 스터디용으로 새로 작성

## HTML

- HTML(HyperText Markup Language) : 웹 콘텐츠의 구조와 의미를 정하는 마크업 언어
- 요소(element) : 여는 태그 + 콘텐츠 + 닫는 태그. 브라우저가 콘텐츠의 역할을 이해하도록 표시
- 속성(attribute) : 요소에 추가 정보를 제공. 보통 여는 태그 안에 `이름="값"` 형태로 작성
- 요소는 다른 요소 안에 중첩할 수 있지만, 연 순서의 반대로 닫아야 한다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>스터디 소개</title>
    <link rel="stylesheet" href="style.css" />
    <script src="script.js" defer></script>
  </head>
  <body>
    <h1>ML 스터디</h1>
    <p>함께 배우고 작은 프로젝트를 만들어 봅니다.</p>
    <a href="https://developer.mozilla.org/ko/">MDN에서 더 알아보기</a>
    <button id="welcome-button">인사 보기</button>
    <p id="message"></p>
  </body>
</html>
```

- `<!doctype html>` : 브라우저에 HTML 문서임을 알림
- `<html lang="ko">` : 문서 전체의 루트 요소, 문서 언어 지정
- `<head>` : 페이지 설정·문서 정보·외부 CSS/JS 연결. 화면에 직접 표시되는 본문은 아님
- `<meta charset="UTF-8">` : 한글 등 문자를 올바르게 표시하기 위한 문자 인코딩
- `<meta name="viewport" ...>` : 모바일 화면 너비에 맞춰 페이지 표시
- `<title>` : 브라우저 탭에 표시할 페이지 제목
- `<body>` : 페이지에 실제로 표시할 콘텐츠
- 자주 쓰는 콘텐츠 요소
  - 제목 : `<h1>`~`<h6>`; 제목 단계와 문서 구조에 맞게 사용
  - 문단 : `<p>`
  - 목록 : 순서 없는 목록 `<ul>`, 순서 있는 목록 `<ol>`, 각 항목 `<li>`
  - 링크 : `<a href="주소">링크 텍스트</a>`; `href`에 이동할 주소 지정
  - 이미지 : `<img src="경로" alt="이미지 설명" />`; `alt`는 대체 텍스트이자 접근성 정보
- 태그를 글씨 크기나 모양만 바꾸는 용도로 고르지 말고 콘텐츠의 의미에 맞춘다.

## CSS

- CSS(Cascading Style Sheets) : HTML 요소의 색, 글꼴, 크기, 배치 등 표현을 지정하는 스타일 시트 언어
- 규칙(rule) : 선택자(selector)가 적용 대상을 고르고, 중괄호 안 선언(declaration)이 속성(property)과 값(value)을 지정

```css
body {
  font-family: sans-serif;
  max-width: 40rem;
  margin: 2rem auto;
  padding: 1rem;
}

h1 {
  color: #2457a6;
}

.highlight {
  background-color: #fff3bf;
}

#welcome-button {
  padding: 0.5rem 1rem;
}
```

- 선택자 예시
  - 요소 선택자 `p` : 모든 `<p>` 요소
  - 클래스 선택자 `.highlight` : `class="highlight"` 요소; 여러 요소에 재사용
  - ID 선택자 `#welcome-button` : `id="welcome-button"` 요소; 한 페이지에서 고유한 요소 식별에 사용
  - 의사 클래스 `a:hover` : 마우스를 올리는 등 특정 상태의 요소
- 선언은 `속성: 값;` 형태로 작성하고, 여러 선언은 세미콜론으로 구분한다.
- CSS 파일을 HTML에 연결 : `<head>` 안에 `<link rel="stylesheet" href="style.css" />`
- 박스 모델 : 콘텐츠(content) + 안쪽 여백(padding) + 테두리(border) + 바깥 여백(margin)
  - `width`, `background-color`, `color`, `border`, `margin`, `padding` 등으로 요소의 크기와 모양 조정
- 같은 요소에 여러 규칙이 적용되면 선택자 우선순위와 계단식(cascade)에 따라 최종 스타일이 결정된다.
- CSS 주석 : `/* 설명 */`

## JS

- JavaScript(JS) : 웹페이지에 동작과 상호작용을 추가하는 프로그래밍 언어
- 브라우저의 DOM(Document Object Model) API를 통해 HTML 요소를 찾고, 내용·속성·스타일을 바꾸거나 이벤트에 반응할 수 있다.
- 변수 : 값을 저장하는 이름. 재할당이 필요하면 `let`, 바꾸지 않을 참조에는 `const` 사용
- 기본 자료형 예시 : 문자열(String), 숫자(Number), 불리언(Boolean); 여러 값은 배열(Array), 관련 값은 객체(Object)로 표현
- 연산자 : `+`, `-`, `*`, `/`; 비교는 `===`, `!==`; 조건에 따른 실행은 `if ... else`
- 함수 : 재사용할 동작을 묶어 이름을 붙인 코드
- 이벤트 : 클릭·입력 등 브라우저에서 일어난 일. 이벤트 처리 함수가 그에 대응하는 동작을 수행

```javascript
const button = document.querySelector("#welcome-button");
const message = document.querySelector("#message");

button.addEventListener("click", function () {
  message.textContent = "함께 배우는 ML 스터디에 오신 걸 환영합니다!";
});
```

- `document.querySelector("#welcome-button")` : CSS 선택자와 같은 방식으로 첫 번째 일치 요소를 찾음
- `addEventListener("click", 함수)` : 클릭 이벤트가 발생하면 등록한 함수를 실행
- `textContent` : 요소 안의 텍스트를 읽거나 변경
- 별도 `script.js` 파일을 연결할 때는 HTML의 `<script src="script.js" defer></script>` 사용
  - `defer` : HTML 문서 해석이 끝난 뒤 스크립트를 실행해 요소를 찾기 전에 코드가 실행되는 문제를 방지
- JavaScript 주석 : 한 줄은 `// 설명`, 여러 줄은 `/* 설명 */`

## 종합 예제: ML 스터디 게시판

- OverTheWire처럼 왼쪽에 단계/주제를 모아 둔 사이드바, 오른쪽에 현재 내용을 보여주는 레이아웃
- 사이드바 항목은 스터디 커리큘럼에 맞춰 구성
- 우상단 로그인 링크, 별도 로그인 페이지, 별도 게시물 작성 페이지
- 게시물 CRUD(Create/Read/Update/Delete)와 FastAPI 요청 위치를 예제로 살펴본다. 실제 서버 연동 전에는 데이터가 저장되지 않는다.
- 예제 파일 구조

```text
ml-study-board/
├── index.html   # 홈페이지와 게시물 목록
├── login.html   # 로그인 화면
├── write.html   # 게시물 작성·수정 화면
├── style.css    # 공통 디자인
└── app.js       # 로그인 데모와 게시물 CRUD
```

- 다섯 파일을 같은 폴더에 만들고 VS Code의 Live Server로 `index.html`을 연다.
- Live Server가 없다면 프로젝트 폴더에서 정적 서버를 실행하고 `http://localhost:8000`에 접속한다.

```bash
python3 -m http.server 8000
```

### 홈페이지: `index.html`

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ML 스터디</title>
    <link rel="stylesheet" href="style.css" />
    <script src="app.js" defer></script>
  </head>
  <body>
    <header class="topbar">
      <a class="brand" href="index.html">ML 스터디</a>
      <nav aria-label="사용자 메뉴">
        <a id="login-link" href="login.html">로그인</a>
      </nav>
    </header>

    <div class="layout">
      <aside class="sidebar">
        <h2>학습 과정</h2>
        <nav aria-label="스터디 주제">
          <p class="nav-group">기초 다지기</p>
          <a href="#python">Python 기초</a>
          <a href="#web">웹 개발 기초</a>
          <a href="#git">Git과 GitHub</a>
          <p class="nav-group">머신러닝</p>
          <a href="#data">데이터와 시각화</a>
          <a href="#regression">회귀와 분류</a>
          <a href="#neural-network">신경망과 딥러닝</a>
        </nav>
      </aside>

      <main class="content">
        <section class="welcome">
          <p class="eyebrow">함께 배우고, 직접 만들어 보기</p>
          <h1>ML 스터디 게시판</h1>
          <p>강의 노트와 질문, 작은 프로젝트 기록을 공유합니다.</p>
          <a class="button-link" href="write.html">게시물 작성</a>
        </section>

        <section aria-labelledby="posts-heading">
          <h2 id="posts-heading">최근 게시물</h2>
          <div id="post-list" class="post-list"></div>
        </section>
      </main>
    </div>
  </body>
</html>
```

- `<header>`, `<aside>`, `<nav>`, `<main>`, `<section>` : 화면 영역의 의미에 맞는 시맨틱 요소
- `aria-label` : 화면 읽기 도구가 내비게이션의 목적을 구분할 수 있도록 설명
- 링크의 `href="#python"` 등은 해당 ID를 가진 페이지 내 영역으로 이동한다. 이 축약 예제에서는 사이드바 구성을 보여주는 용도
- 로그인 링크를 홈페이지 우상단에 배치한다. 로그인 상태 유지는 추후 백엔드 연동에서 다룬다.

### 로그인 화면: `login.html`

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>로그인 | ML 스터디</title>
    <link rel="stylesheet" href="style.css" />
    <script src="app.js" defer></script>
  </head>
  <body>
    <header class="topbar">
      <a class="brand" href="index.html">ML 스터디</a>
      <a href="index.html">홈으로</a>
    </header>

    <main class="form-page">
      <h1>로그인</h1>
      <p>수업용 데모 계정: ID <code>admin</code> / PW <code>qwer</code></p>
      <form id="login-form" class="card-form">
        <label for="username">사용자 이름</label>
        <input id="username" name="username" autocomplete="username" required />

        <label for="password">비밀번호</label>
        <input
          id="password"
          name="password"
          type="password"
          autocomplete="current-password"
          required
        />

        <button type="submit">로그인</button>
        <p id="login-message" role="status"></p>
      </form>
    </main>
  </body>
</html>
```

- `<label for="...">`와 입력 요소의 `id`를 연결해 입력 항목의 의미를 명확히 한다.
- `required`, `type="password"`, `autocomplete` : 브라우저 기본 입력 검증, 입력값 가림, 비밀번호 관리 도구 지원
- 이 예제는 JavaScript에 하드코딩한 데모 ID/PW를 비교한다. 입력한 비밀번호를 브라우저 저장소에 저장하지 않는다.
- 실제 서비스에서 ID/PW를 프론트엔드 코드에 하드코딩하면 누구나 확인할 수 있으므로 절대 사용하지 않는다. FastAPI 서버에서 인증하고 응답을 처리하는 부분은 아래 `app.js`에 주석 예시로 남긴다.

### 게시물 작성·수정 화면: `write.html`

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>게시물 작성 | ML 스터디</title>
    <link rel="stylesheet" href="style.css" />
    <script src="app.js" defer></script>
  </head>
  <body>
    <header class="topbar">
      <a class="brand" href="index.html">ML 스터디</a>
      <a href="index.html">홈으로</a>
    </header>

    <main class="form-page">
      <h1 id="form-heading">게시물 작성</h1>
      <form id="post-form" class="card-form">
        <label for="post-title">제목</label>
        <input id="post-title" name="title" maxlength="100" required />

        <label for="post-content">내용</label>
        <textarea id="post-content" name="content" rows="10" required></textarea>

        <div class="form-actions">
          <a class="button-link secondary" href="index.html">취소</a>
          <button id="save-post-button" type="submit">게시하기</button>
        </div>
      </form>
    </main>
  </body>
</html>
```

- 같은 작성 페이지를 새 게시물 생성과 기존 게시물 수정에 함께 사용한다.
- 수정 링크는 `write.html?id=게시물ID` 형태로 열고, JavaScript가 기존 내용을 입력란에 채운다.

### 공통 스타일: `style.css`

```css
:root {
  font-family: system-ui, sans-serif;
  color: #202938;
  background: #f4f6fa;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

a {
  color: #2457a6;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #17243a;
  color: white;
}

.topbar a {
  color: white;
}

.brand {
  font-size: 1.25rem;
  font-weight: 700;
  text-decoration: none;
}

.layout {
  display: grid;
  grid-template-columns: 15rem minmax(0, 1fr);
  min-height: calc(100vh - 4rem);
}

.sidebar {
  padding: 1.5rem;
  background: #e8edf5;
}

.sidebar nav,
.post-list {
  display: grid;
  gap: 0.75rem;
}

.sidebar a {
  padding: 0.4rem;
  text-decoration: none;
}

.nav-group {
  margin: 1rem 0 0.25rem;
  font-weight: 700;
}

.content {
  width: min(100%, 55rem);
  padding: 2rem;
}

.welcome,
.post-card,
.card-form {
  padding: 1.5rem;
  border: 1px solid #d8deea;
  border-radius: 0.75rem;
  background: white;
}

.welcome {
  margin-bottom: 2rem;
}

.eyebrow {
  color: #52627a;
}

.button-link,
button {
  display: inline-block;
  padding: 0.65rem 1rem;
  border: 0;
  border-radius: 0.4rem;
  background: #2457a6;
  color: white;
  font: inherit;
  text-decoration: none;
  cursor: pointer;
}

.secondary {
  background: #68758a;
}

.post-card h3 {
  margin-top: 0;
}

.post-actions,
.form-actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.form-page {
  width: min(100% - 2rem, 40rem);
  margin: 3rem auto;
}

.card-form {
  display: grid;
  gap: 0.75rem;
}

input,
textarea {
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #aeb9ca;
  border-radius: 0.35rem;
  font: inherit;
}

@media (max-width: 700px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .sidebar nav {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .topbar,
  .content {
    padding: 1rem;
  }
}
```

- `display: grid` : 사이드바와 본문, 목록의 배치
- `display: flex` : 상단 메뉴와 버튼 묶음의 정렬
- `@media` : 화면 너비가 좁을 때 사이드바를 위쪽으로 옮기는 반응형 규칙
- `box-sizing: border-box` : 지정한 너비에 padding과 border를 포함해 크기를 계산

### 게시물·로그인 동작: `app.js`

```javascript
const DEMO_ID = "admin";
const DEMO_PASSWORD = "qwer";

// 예시 화면에 보여줄 임시 게시물. 새로고침하면 원래 내용으로 돌아간다.
const demoPosts = [
  { id: 1, title: "ML 스터디 시작", content: "함께 공부해요!", author: "admin" },
];

function renderPosts(posts) {
  const postList = document.querySelector("#post-list");
  if (!postList) return;

  postList.replaceChildren();
  for (const post of posts) {
    const article = document.createElement("article");
    article.className = "post-card";

    const title = document.createElement("h3");
    title.textContent = post.title;
    const content = document.createElement("p");
    content.textContent = post.content;
    const author = document.createElement("small");
    author.textContent = `작성자: ${post.author}`;
    article.append(title, content, author);

    const editLink = document.createElement("a");
    editLink.href = `write.html?id=${encodeURIComponent(post.id)}`;
    editLink.textContent = "수정";

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "삭제";
    deleteButton.addEventListener("click", () => {
      // FastAPI 연결 후 삭제 요청 예시:
      // fetch(`http://localhost:8000/posts/${post.id}`, { method: "DELETE" });
      alert("백엔드 연결 후 게시물을 삭제합니다.");
    });

    const actions = document.createElement("div");
    actions.className = "post-actions";
    actions.append(editLink, deleteButton);
    article.append(actions);
    postList.append(article);
  }
}

const loginForm = document.querySelector("#login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const username = String(formData.get("username")).trim();
    const password = String(formData.get("password"));
    const message = document.querySelector("#login-message");

    if (username === DEMO_ID && password === DEMO_PASSWORD) {
      message.textContent = "데모 로그인 성공. 서버 세션은 아직 연결되지 않았습니다.";
    } else {
      message.textContent = "ID 또는 비밀번호를 확인해 주세요.";
    }

    // FastAPI 로그인 API 연결 예시 (현재는 주석 상태):
    // const response = await fetch("http://localhost:8000/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ username, password }),
    // });
    // const result = await response.json();
  });
}

const postForm = document.querySelector("#post-form");
if (postForm) {
  const postId = new URLSearchParams(window.location.search).get("id");
  const existingPost = demoPosts.find((post) => String(post.id) === postId);

  if (existingPost) {
    document.querySelector("#form-heading").textContent = "게시물 수정";
    document.querySelector("#post-title").value = existingPost.title;
    document.querySelector("#post-content").value = existingPost.content;
    document.querySelector("#save-post-button").textContent = "수정 완료";
  }

  postForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(postForm);
    const post = {
      title: String(formData.get("title")).trim(),
      content: String(formData.get("content")).trim(),
    };

    if (existingPost) {
      // Update: PUT /posts/{post_id}
      // await fetch(`http://localhost:8000/posts/${postId}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(post),
      // });
    } else {
      // Create: POST /posts
      // await fetch("http://localhost:8000/posts", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(post),
      // });
    }

    alert("FastAPI 서버 연결 후 게시물을 저장합니다.");
  });
}

// Read: 홈페이지를 열 때 FastAPI에서 게시물 목록을 요청하는 예시
// fetch("http://localhost:8000/posts")
//   .then((response) => response.json())
//   .then((posts) => renderPosts(posts));

renderPosts(demoPosts);
```

- 로그인 데모 계정 : ID `admin`, PW `qwer`; JavaScript에서 입력값을 비교할 뿐 로그인 상태를 저장하지 않는다.
- `demoPosts`는 화면 구조 확인을 위한 하드코딩 예시 데이터다. 게시물 생성·수정·삭제 결과는 저장되지 않는다.
- 현재는 인증 세션과 서버 권한 검사가 없으므로 작성 페이지 주소를 직접 입력해 접근할 수 있다. FastAPI를 연결할 때 서버에서 인증과 권한을 검사하도록 확장한다.
- CRUD와 서버 통신 연결 위치
  - Create(생성) : `POST /posts` 요청 주석
  - Read(조회) : `GET /posts` 요청 주석
  - Update(수정) : `PUT /posts/{post_id}` 요청 주석
  - Delete(삭제) : `DELETE /posts/{post_id}` 요청 주석
- `fetch()` : 브라우저 JavaScript에서 서버에 HTTP 요청을 보내는 함수. 현재 예시는 FastAPI 구현 전이므로 요청 코드를 주석 처리했다.
- `textContent`로 게시물 내용을 표시해 입력 텍스트가 HTML로 실행되지 않도록 한다.
- `admin` / `qwer` 하드코딩은 학습용 임시 예외다. 프론트엔드 코드는 누구나 볼 수 있으므로 실제 서비스의 계정·비밀번호를 코드에 넣지 않는다. 이후 FastAPI 서버가 로그인과 권한 확인을 맡아야 한다.
