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
