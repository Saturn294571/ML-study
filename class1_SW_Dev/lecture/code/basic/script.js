const button = document.querySelector("#welcome-button");
const message = document.querySelector("#message");

button.addEventListener("click", function () {
  message.textContent = "함께 배우는 ML 스터디에 오신 걸 환영합니다!";
});