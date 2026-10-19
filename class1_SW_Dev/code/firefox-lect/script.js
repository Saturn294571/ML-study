// 함수 정의
function changeImg(img) {
    let mySrc = img.getAttribute('src');
    if (mySrc === './images/firefox-logo.png') {
        img.setAttribute('src', './images/firefox2.png');
    } else {
        img.setAttribute('src', './images/firefox-logo.png');
    }
}

const setUserName = function() {
    let myName = prompt('please enter your name');
    if (!myName || myName === null) {
        setUserName();
    } else {
        localStorage.setItem('name', myName);
        myHeading.textContent = "Mozilla is cool, " + myName;
    }
}

// 변수 정의 및 스크립트 실행
let myImage = document.querySelector('img');
myImage.onclick = changeImg(myImage)

let myBtn = document.querySelector('button');
let myHeading = document.querySelector('h1');
myBtn.onclick = function() {
    setUserName();
}

if (!localStorage.getItem('name')) {
    setUserName();
} else {
    let storedName = localStorage.getItem('name');
    myHeading.textContent = "Mozilla is cool, " + storedName;
}