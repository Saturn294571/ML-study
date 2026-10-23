# LazyVim 실습형 튜토리얼 — 기초부터 개발 환경까지

현재 설치하신 Linux + LazyVim 환경을 기준으로, **일반적인 소프트웨어 개발에서 가장 자주 사용하는 기능**을 중심으로 학습 과정을 구성하겠습니다.

특정 언어나 프레임워크에 종속되지 않도록 설계하되, 실습에서는 익숙하신 Python을 사용하겠습니다.

현재 LazyVim 공식 문서의 기본 단축키를 기준으로 하며, 별도 설치가 필요한 기능은 명시하겠습니다. [LazyVim](https://www.lazyvim.org/keymaps?utm_source=chatgpt.com)

## 전체 학습 로드맵

| 단계 | 주제 | 핵심 학습 목표 |
|---|---|---|
| **1** | Vim Motions & Text Objects | 마우스 없이 코드를 효율적으로 수정 |
| **2** | Explorer, Picker, Buffer | 프로젝트 탐색 및 파일·코드 검색 |
| **3** | LSP & 자동완성 | IDE 수준의 코드 탐색과 수정 |
| **4** | 플러그인 및 환경 설정 | LazyVim의 구조 이해와 설정 관리 |
| **5** | Git & 터미널 | 실제 개발 워크플로 통합 |

각 단계에서는 다음 네 가지를 구분하겠습니다.

- **개념:** 기능이 필요한 이유와 작동 원리
- **조작:** 핵심 단축키 및 명령어
- **실습:** 실제 코드를 이용한 연습
- **완료 기준:** 다음 단계로 진행할 수 있는 숙련도

추가로, Neovim 자체 기능인지 LazyVim이 제공하는 기능인지도 구분하겠습니다.

---

# 1단계. Vim Motions & Text Objects

## 1.1. Vim의 가장 중요한 설계 철학

일반적인 편집기는 주로 다음처럼 작동합니다.

> 커서 이동 → 텍스트 선택 → 삭제 또는 수정

반면 Vim은 텍스트 편집을 일종의 명령어 조합으로 취급합니다.

기본적인 문법은 다음과 같습니다.

\[
\text{Command} = [Count] + Operator + Motion
\]

예를 들어,

```vim
d2w
```

이를 분해하면 다음과 같습니다.

| 구성 | 의미 |
|---|---|
| `d` | Delete: 삭제 |
| `2` | Count: 두 번 |
| `w` | Motion: 다음 단어 방향으로 이동 |

즉, 현재 커서부터 `2w` 모션으로 지정되는 범위를 삭제하라는 뜻입니다.

이러한 조합 방식은 Vim에서 매우 중요합니다.

명령어를 하나하나 암기하는 대신 **적은 수의 연산자와 이동 명령을 조합하여 많은 편집 작업을 수행**할 수 있기 때문입니다.

## 1.2. 학습 환경 준비

실제 프로젝트의 파일을 손상하지 않도록 별도 파일을 사용하겠습니다.

터미널에서 실행하십시오.

```bash
mkdir -p ~/vim-practice
cd ~/vim-practice
nvim practice.py
```

Neovim이 실행되면 `i`를 눌러 Insert 모드로 전환하고 다음 코드를 입력합니다.

```python
def calculate_total(price, quantity):
    total = price * quantity
    tax = total * 0.1
    return total + tax


def greet(name):
    message = "Hello, World!"
    print(message)


numbers = [10, 20, 30, 40, 50]
```

입력이 끝났다면 다음을 실행하십시오.

```text
Esc
:w
```

이제부터는 이 파일을 이용해 실습합니다.

## 1.3. 기본적인 커서 이동 — Motion

우선 Normal 모드에서 사용합니다.

| 명령 | 동작 |
|---|---|
| `h` | 왼쪽 한 칸 |
| `j` | 아래 한 줄 |
| `k` | 위 한 줄 |
| `l` | 오른쪽 한 칸 |
| `w` | 다음 단어의 시작 |
| `b` | 이전 단어의 시작 |
| `e` | 현재 또는 다음 단어의 끝 |
| `0` | 현재 줄의 첫 번째 열 |
| `^` | 현재 줄의 첫 번째 비공백 문자 |
| `$` | 현재 줄의 끝 |
| `gg` | 파일 첫 줄 |
| `G` | 파일 마지막 줄 |
| `5G` | 파일 5번째 줄 |

### 실습 A

커서를 파일 맨 처음으로 이동하십시오.

```vim
gg
```

그리고 다음을 입력하십시오.

```vim
5j
```

현재 위치에서 다섯 줄 아래로 이동합니다.

이후 다음을 입력합니다.

```vim
$
```

현재 줄의 끝으로 이동합니다.

**중요한 점은 숫자와 이동 명령을 조합할 수 있다는 사실입니다.**

예를 들어 `3w`, `10j`, `5k` 모두 같은 원리로 작동합니다.

---

## 1.4. Operator — 텍스트를 수정하는 명령어

다음은 가장 중요한 연산자입니다.

| 명령 | 의미 |
|---|---|
| `d` | Delete: 삭제 |
| `c` | Change: 삭제한 다음 Insert 모드 진입 |
| `y` | Yank: 복사 |
| `>` | 들여쓰기 |
| `<` | 내어쓰기 |
| `=` | 자동 들여쓰기 |

이 연산자에 Motion을 결합할 수 있습니다.

예를 들어 다음과 같습니다.

```vim
dw
```

현재 커서부터 다음 단어의 시작까지 삭제합니다.

```vim
cw
```

현재 커서에서 `w`에 대응하는 범위를 수정합니다. 다만 Vim의 `cw`는 실제로 단어 끝을 기준으로 동작하는 특수한 규칙이 있습니다.

```vim
y$
```

현재 커서부터 줄 끝까지 복사합니다.

### 실습 B

다음 코드에서,

```python
total = price * quantity
```

커서를 `price`의 첫 글자인 `p`에 위치시킵니다.

그다음 입력하십시오.

```vim
dw
```

`price`와 뒤따르는 공백이 삭제됩니다.

이제 다음을 입력합니다.

```vim
u
```

삭제를 취소합니다.

`u`는 Undo입니다.

이 과정을 반복하면서 Operator와 Motion의 관계를 이해해 보십시오.

---

## 1.5. Text Objects — Vim의 핵심 기능

여기서부터 일반적인 편집기와 차이가 뚜렷해집니다.

Vim은 텍스트를 단순한 문자 배열이 아니라 **단어, 괄호, 문자열 등의 논리적 단위**로 다룰 수 있습니다.

Text Object는 다음 두 가지 개념으로 구성됩니다.

| 명령 | 의미 |
|---|---|
| `i` | Inner: 내부 |
| `a` | Around: 주변 구분자 또는 공백까지 포함 |

예를 들어 다음 Python 코드가 있다고 하겠습니다.

```python
print("Hello, World!")
```

커서가 문자열 안에 있을 때 다음을 입력합니다.

```vim
ci"
```

이 명령은 다음처럼 해석할 수 있습니다.

- `c`: 변경
- `i`: 내부
- `"`: 큰따옴표

결과적으로 큰따옴표는 보존하면서 내부 문자열만 삭제하고 Insert 모드로 진입합니다.

따라서 곧바로 다음 문자열을 입력할 수 있습니다.

```text
Hello, Python!
```

### 자주 사용하는 Text Objects

| 명령 | 의미 |
|---|---|
| `ciw` | 커서가 위치한 단어 변경 |
| `diw` | 단어 삭제 |
| `yiw` | 단어 복사 |
| `ci"` | 큰따옴표 내부 변경 |
| `di"` | 큰따옴표 내부 삭제 |
| `ci(` | 소괄호 내부 변경 |
| `di(` | 소괄호 내부 삭제 |
| `ya"` | 큰따옴표와 내부 내용 복사 |
| `da(` | 괄호와 내부 내용 삭제 |
| `vip` | 현재 문단 선택 |

여기서 `ciw`를 특히 추천합니다.

Python에서 변수명이나 함수 호출의 인자를 수정할 때 매우 자주 사용할 수 있기 때문입니다.

### 실습 C

다음 코드를 보겠습니다.

```python
def calculate_total(price, quantity):
```

커서를 `quantity` 내부에 놓고 다음 명령을 입력합니다.

```vim
ciw
```

그다음 다음 문자열을 입력합니다.

```text
amount
```

마지막으로 `Esc`를 누릅니다.

결과:

```python
def calculate_total(price, amount):
```

이것이 Vim에서 가장 기본적이면서도 강력한 편집 방식입니다.

---

## 1.6. 검색과 문자 기반 이동

실무에서는 단어 단위 이동보다 특정 위치를 찾아 이동하는 일이 많습니다.

### 검색

```vim
/quantity
```

파일에서 `quantity`를 검색합니다.

| 명령 | 의미 |
|---|---|
| `/text` | 아래 방향 검색 |
| `?text` | 위 방향 검색 |
| `n` | 다음 검색 결과 |
| `N` | 이전 검색 결과 |

### 현재 줄에서 문자 찾기

```vim
f(
```

현재 줄에서 다음 `(` 문자의 위치로 이동합니다.

반면 다음 명령은,

```vim
t(
```

해당 `(` 바로 앞까지 이동합니다.

| 명령 | 의미 |
|---|---|
| `fx` | 다음 문자 x로 이동 |
| `Fx` | 이전 문자 x로 이동 |
| `tx` | 다음 문자 x의 직전 위치 |
| `Tx` | 이전 문자 x의 직후 위치 |
| `;` | 직전 문자 검색 반복 |
| `,` | 직전 문자 검색의 반대 방향 반복 |

`f`, `t`는 Operator와 조합할 수도 있습니다.

예를 들어,

```vim
dt,
```

현재 커서부터 다음 쉼표 직전까지 삭제합니다.

---

## 1.7. 반복 작업

Vim의 중요한 장점 중 하나는 편집 명령을 반복할 수 있다는 점입니다.

```vim
.
```

마지막 편집 작업을 반복합니다.

예를 들어 다음 코드에서,

```python
apple = 10
banana = 20
cherry = 30
```

`apple`에 커서를 놓고,

```vim
ciw
```

를 이용해 `orange`로 변경합니다.

그다음 다른 단어로 이동해 `.`을 누르면 같은 변경 작업을 반복할 수 있습니다.

단, 반복되는 것은 **직전 편집 명령**이므로 커서 위치와 텍스트 구조에 따라 결과가 달라집니다.

### 그 밖에 유용한 명령

| 명령 | 의미 |
|---|---|
| `.` | 마지막 편집 반복 |
| `u` | Undo |
| `Ctrl+r` | Redo |
| `dd` | 현재 줄 삭제 |
| `yy` | 현재 줄 복사 |
| `p` | 붙여넣기 |
| `J` | 다음 줄을 현재 줄에 결합 |
| `>>` | 현재 줄 들여쓰기 |
| `<<` | 현재 줄 내어쓰기 |

---

## 1.8. 1단계 종합 실습

다음 코드를 수정해 보십시오.

```python
def calculate(price, quantity):
    result = price * quantity
    print("Calculation completed")
    return result
```

**목표**

1. `calculate`를 `calculate_total`로 변경합니다.
2. `quantity`를 `amount`로 변경합니다.
3. `result`를 `total`로 변경합니다. 모든 등장 위치를 수정합니다.
4. `"Calculation completed"`를 `"Done"`으로 변경합니다.
5. 마지막 줄에 `# End of calculation`을 추가합니다.
6. 변경 사항을 저장합니다.

가능하면 마우스나 방향키 대신 Vim의 명령어를 사용하십시오.

### 추천 명령

`ciw`, `ci"`, `/`, `n`, `o`, `Esc`, `:w`

이 단계에서는 모든 작업을 가장 적은 키 입력으로 수행하려고 할 필요는 없습니다.

**목표는 Vim을 단순한 텍스트 입력기가 아니라 구조적인 텍스트 조작 도구로 사용하는 데 익숙해지는 것입니다.**

### 1단계 완료 기준

다음 작업이 가능하면 2단계로 넘어갈 수 있습니다.

- 원하는 단어와 줄로 신속하게 이동
- `ciw`, `ci"`, `di(` 등으로 특정 범위 수정
- `/`, `n`, `N`으로 코드 검색
- `u`, `Ctrl+r`, `.`으로 편집 취소·복구·반복
- `:w`, `:q`로 파일 저장 및 종료

---

# 2단계. Explorer, Picker, Buffer

이 단계에서는 **프로젝트를 탐색하고 여러 파일을 관리하는 방법**을 학습합니다.

LazyVim을 IDE로 사용하기 위해 반드시 알아야 하는 부분입니다.

## 2.1. 세 가지 개념의 차이

| 개념 | 역할 | VS Code와 비교 |
|---|---|---|
| Explorer | 디렉터리 구조 탐색 | Explorer 사이드바 |
| Picker | 파일·문자열·명령어 검색 및 선택 | Quick Open, Command Palette |
| Buffer | Neovim이 메모리에 로드한 파일 등의 편집 대상 | 열린 편집 문서와 유사 |

특히 Buffer와 Window를 구별해야 합니다.

- **Buffer:** 편집 대상 데이터
- **Window:** Buffer를 보여주는 화면 영역
- **Tab:** 여러 Window를 담을 수 있는 화면 배치 단위

따라서 Vim의 Tab은 VS Code의 파일 탭과 정확히 같은 개념은 아닙니다.

## 2.2. Explorer와 Picker

현재 LazyVim에서는 기본적으로 Snacks 기반 탐색 및 검색 기능을 제공합니다. 예전 튜토리얼에서 많이 등장하는 Telescope나 Neo-tree가 반드시 필요한 것은 아닙니다. [LazyVim](https://www.lazyvim.org/keymaps?utm_source=chatgpt.com)

`<leader>`는 기본값인 `Space`를 의미합니다.

| 단축키 | 기능 |
|---|---|
| `<leader>e` | 프로젝트 루트 기준 Explorer |
| `<leader>E` | 현재 작업 디렉터리 기준 Explorer |
| `<leader>ff` | 프로젝트 파일 검색 |
| `<leader>fF` | 현재 작업 디렉터리에서 파일 검색 |
| `<leader>fr` | 최근 파일 검색 |
| `<leader>/` | 프로젝트 전체에서 문자열 검색 |
| `<leader>sg` | 프로젝트 전체 Grep 검색 |
| `<leader><space>` | 빠른 파일 검색 |

### 실습

기존 프로젝트에서 다음 명령을 실행합니다.

```bash
cd ~/Documents/ML_study
nvim
```

Normal 모드에서 다음을 순서대로 수행하십시오.

1. `Space e`로 Explorer 열기
2. 디렉터리 구조 탐색
3. `Space f f`로 파일 검색
4. `README.md` 입력 후 파일 열기
5. `Space /`로 프로젝트 전체에서 `Python` 검색

## 2.3. Buffer와 Window 관리

| 단축키 | 기능 |
|---|---|
| `Shift+h` | 이전 Buffer |
| `Shift+l` | 다음 Buffer |
| `<leader>,` | Buffer 목록 검색 |
| `<leader>bd` | 현재 Buffer 닫기 |
| `<leader>-` | 수평 분할 |
| `<leader>\|` | 수직 분할 |
| `Ctrl+h/j/k/l` | Window 사이 이동 |
| `<leader>wd` | 현재 Window 닫기 |

### 실습

`README.md`와 Python 파일 하나를 각각 열고 다음을 수행하십시오.

1. 두 파일 사이를 이동합니다.
2. 화면을 수직으로 분할합니다.
3. 각 Window에 다른 파일을 표시합니다.
4. Window 사이를 키보드로 이동합니다.
5. 한쪽 Window를 닫습니다.

**완료 기준:** 프로젝트 내 파일을 검색하고, 여러 파일을 열고, 화면을 분할하여 작업할 수 있어야 합니다.

---

# 3단계. LSP & 자동완성

이 단계부터 LazyVim의 IDE 기능을 활용합니다.

## 3.1. LSP란?

LSP(Language Server Protocol)는 코드 편집기와 언어 분석 서버 사이의 통신 규약입니다.

```text
Neovim
   │
   │ Language Server Protocol
   ▼
Language Server
   │
   ├── 코드 정의 분석
   ├── 타입 검사
   ├── 참조 검색
   ├── 코드 수정 제안
   └── 오류 진단
```

이 구조 덕분에 편집기가 모든 언어의 분석 기능을 직접 구현할 필요가 없습니다.

## 3.2. Python 개발 환경 설정

LazyVim에서 다음 명령을 실행하십시오.

```vim
:LazyExtras
```

여기서 Python 지원을 활성화합니다.

```text
lang.python
```

현재 Python Extra는 Pyright, Ruff 등의 도구를 설정하며, 가상환경 선택 기능도 제공합니다. [LazyVim](https://www.lazyvim.org/extras/lang/python?utm_source=chatgpt.com)

이후 관련 서버가 설치되었는지 확인합니다.

```vim
:Mason
```

LSP 연결 상태는 다음으로 확인합니다.

```vim
:LspInfo
```

## 3.3. 핵심 단축키

| 단축키 | 기능 |
|---|---|
| `gd` | 정의 위치로 이동 |
| `gr` | 참조 위치 검색 |
| `K` | 타입 및 문서 정보 확인 |
| `<leader>cr` | 심벌 이름 변경 |
| `<leader>ca` | Code Action |
| `<leader>cf` | 코드 포맷팅 |
| `<leader>cd` | 현재 줄 진단 확인 |
| `]d` | 다음 진단 위치 |
| `[d` | 이전 진단 위치 |
| `<leader>cl` | LSP 정보 확인 |

이는 현재 LazyVim 공식 단축키에 포함된 기능입니다. [LazyVim](https://www.lazyvim.org/keymaps?utm_source=chatgpt.com)

### 실습

```python
def calculate_total(price, quantity):
    return price * quantity


result = calculate_total(100, 3)
print(result)
```

다음 작업을 수행합니다.

1. `calculate_total` 함수 호출 위에서 `gd`를 입력합니다.
2. 함수 정의로 이동하는지 확인합니다.
3. `gr`로 참조 위치를 확인합니다.
4. `<leader>cr`로 함수 이름을 변경합니다.
5. `K`로 관련 정보를 확인합니다.
6. `<leader>cf`로 코드 포맷팅을 실행합니다.

일부 동작은 Language Server의 지원 범위와 연결 상태에 따라 달라집니다.

**완료 기준:** VS Code에서 사용하던 정의 이동, 이름 변경, 타입 검사, 코드 포맷팅을 LazyVim에서도 수행할 수 있어야 합니다.

---

# 4단계. 플러그인 및 환경 설정

이제 LazyVim 내부 구조를 이해할 차례입니다.

## 4.1. 설정 디렉터리

현재 공식 구조는 다음과 같습니다. [LazyVim](https://www.lazyvim.org/configuration?utm_source=chatgpt.com)

```text
~/.config/nvim/
├── init.lua
└── lua/
    ├── config/
    │   ├── lazy.lua
    │   ├── options.lua
    │   ├── keymaps.lua
    │   └── autocmds.lua
    └── plugins/
        └── ...
```

각 파일의 역할은 다음과 같습니다.

| 파일 | 기능 |
|---|---|
| `init.lua` | 초기 설정 진입점 |
| `lazy.lua` | lazy.nvim 및 LazyVim 초기화 설정 |
| `options.lua` | Neovim 환경 옵션 |
| `keymaps.lua` | 사용자 지정 단축키 |
| `autocmds.lua` | 이벤트 기반 자동 명령 |
| `plugins/` | 플러그인 추가 및 기존 설정 변경 |

## 4.2. 가장 먼저 알아둘 명령어

| 명령 | 기능 |
|---|---|
| `:Lazy` | 플러그인 관리 |
| `:Lazy sync` | 플러그인 설치·갱신·정리 동기화 |
| `:LazyExtras` | LazyVim 추가 기능 관리 |
| `:Mason` | LSP 서버 및 개발 도구 관리 |
| `:checkhealth` | Neovim 환경 진단 |

## 4.3. 사용자 지정 단축키 추가

예를 들어 `Ctrl+s`를 저장 단축키로 지정하고 싶다면 다음 파일을 수정할 수 있습니다.

```text
~/.config/nvim/lua/config/keymaps.lua
```

내용:

```lua
vim.keymap.set("n", "<C-s>", "<cmd>w<cr>", {
  desc = "Save file",
})
```

다만 **LazyVim에는 이미 `Ctrl+s` 저장 매핑이 기본으로 제공**되므로, 이 코드는 설정 방법을 보여주는 예시입니다.

추가 설정 없이 사용 가능한 기능부터 확인한 뒤 필요한 부분만 변경하는 편이 좋습니다. [LazyVim](https://www.lazyvim.org/keymaps?utm_source=chatgpt.com)

**완료 기준:** 기본 설정을 유지하면서 필요한 옵션과 단축키를 안전하게 변경할 수 있어야 합니다.

---

# 5단계. Git & 터미널 통합

마지막은 실제 개발 워크플로입니다.

이미 Git과 Linux CLI에 익숙하시므로, 여기서는 새로운 명령어를 학습하기보다 Neovim과 통합하는 데 집중하면 됩니다.

## 5.1. Git 관련 단축키

| 단축키 | 기능 |
|---|---|
| `<leader>gs` | Git Status |
| `<leader>gd` | Git Diff |
| `<leader>gb` | 현재 줄 Git Blame |
| `<leader>gl` | Git Log |
| `<leader>gf` | 현재 파일의 Git History |

해당 기능의 일부는 Snacks Picker를 사용하며, 프로젝트가 Git 저장소여야 의미 있게 동작합니다. [LazyVim](https://www.lazyvim.org/keymaps?utm_source=chatgpt.com)

## 5.2. Neovim 내부에서 터미널 사용

| 단축키 | 기능 |
|---|---|
| `<leader>ft` | 프로젝트 루트에서 터미널 실행 |
| `<leader>fT` | 현재 작업 디렉터리에서 터미널 실행 |
| `Ctrl+/` | 터미널 토글 |

터미널에서 명령을 입력하고 다시 Normal 모드로 돌아올 때는 일반적으로 다음을 사용합니다.

```text
Ctrl+\  Ctrl+n
```

이는 터미널 입력 모드에서 벗어나는 Neovim 기본 명령입니다.

## 5.3. 종합 실습

다음 개발 과정을 LazyVim에서 수행해 보십시오.

```text
프로젝트 열기
    │
    ▼
Explorer로 파일 탐색
    │
    ▼
Python 코드 수정
    │
    ▼
LSP 진단 및 포맷팅
    │
    ▼
내부 터미널에서 실행
    │
    ▼
Git Diff 확인
    │
    ▼
변경 사항 Commit
```

마지막 Commit은 익숙한 Git CLI를 그대로 이용해도 됩니다.

---

# 최종 학습 목표

이 튜토리얼을 완료하면 다음과 같은 작업 흐름을 사용할 수 있습니다.

| 작업 | 활용 기능 |
|---|---|
| 코드 수정 | Vim Motions, Text Objects |
| 프로젝트 탐색 | Snacks Explorer |
| 파일 및 문자열 검색 | Snacks Picker |
| 다중 파일 편집 | Buffer, Window |
| 코드 분석 | LSP |
| 코드 포맷팅 | Formatter |
| 환경 확장 | lazy.nvim, LazyExtras |
| 버전 관리 | Git 통합 |
| 프로그램 실행 | 내장 터미널 |

## 학습하면서 지킬 원칙

**처음부터 모든 단축키를 암기할 필요는 없습니다.**

LazyVim에는 `which-key.nvim`이 기본적으로 통합되어 있습니다. Normal 모드에서 `Space`를 누르면 사용할 수 있는 명령어가 표시됩니다.

따라서 자주 사용하는 기능을 먼저 익힌 다음, 필요한 기능을 검색하면서 자연스럽게 학습하는 것이 좋습니다.

또한 현재 설치된 LazyVim의 버전이나 활성화된 Extra에 따라 세부 단축키가 달라질 수 있으므로, 설명과 실제 동작이 다르다면 설치된 환경의 매핑을 우선 확인하겠습니다.

**추천 학습 방식은 각 단계를 실제로 수행한 다음 다음 단계로 넘어가는 것입니다.** 특히 1단계의 `Operator + Motion + Text Object`는 이후 모든 작업의 기반이 되므로 충분히 익힐 가치가 있습니다.

다음 실습에서는 1단계의 `ciw`, `di(`, `ya"` 등을 활용해 실제 Python 코드를 수정하는 과정을 더 깊게 다룰 수 있습니다.
