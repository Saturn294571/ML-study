# README

## 파이썬 가상환경 (pip, .venv, 파이썬 인터프리터)

### 1. 가상환경 생성

- 파이썬 가상환경 생성 (**backend 폴더에서**)
python -m venv .venv

### 2. 가상환경 활성화

- 가상환경 활성화 (**backend 폴더에서**)
source .venv/bin/activate

### 3. pip를 통해 패키지 이용 

- 패키지 설치
    - 가상환경 내에서 pip 설치시 .venv에 저장
pip install fastAPI

- 패키지 목록 확인
pip list

- 의존성 목록 저장
pip freeze > requirements.txt

### 4. 가상환경 나오기(비활성화)
- 가상환경 빠져나오기
deactivate

### 5. vscode 내에서 파이썬 인터프리터 설정하기

Ctrl+Shift+P -> Python: Select Interpreter -> Enter interpreter path... -> (아래 경로 입력)
class1_SW_Dev/code/ML-board/backend/.venv/bin/python

## uvicorn 및 fastAPI 서버 실행

(backend 폴더에서)

### uvicorn 설치

pip install uvicorn

### uvicorn을 통한 fastAPI 서버 실행

uvicorn main:app --reload

- main -> main.py ; app -> main.py의 app 객체
- --reload -> 프로그램이 변경되면 서버 재시작 없이 그 내용을 반영