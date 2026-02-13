# React 최신 버전 학습 프로젝트

React 18/19의 최신 기능들을 체계적으로 학습하고 실습할 수 있는 인터랙티브 학습 프로젝트입니다.

## 📋 프로젝트 정보

- **프레임워크**: React 19.2.4
- **빌드 도구**: Vite
- **언어**: TypeScript
- **라우팅**: React Router v7
- **스타일링**: CSS (다크 모드 지원)

## 🚀 시작하기

### 1. 프로젝트 설치

```bash
cd react-learning
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속합니다.

### 3. 프로젝트 빌드

```bash
npm run build
```

## 📚 학습 구조

### 기본 Hooks

#### [useState](src/pages/HooksDemo/UseStateDemo.tsx)
- 함수 컴포넌트에서 상태(state) 관리
- 상태 변경 및 리렌더링
- 함수형 업데이트 패턴

#### [useEffect](src/pages/HooksDemo/UseEffectDemo.tsx)
- 컴포넌트의 부수 효과(side effect) 처리
- 의존성 배열 이해
- 클린업 함수로 리소스 정리

#### [useContext](src/pages/HooksDemo/UseContextDemo.tsx)
- React Context를 통한 전역 상태 공유
- Props drilling 해결
- Context Provider와 useContext 사용법

#### [useReducer](src/pages/HooksDemo/UseReducerDemo.tsx)
- 복잡한 상태 로직 관리
- Redux 패턴의 이해
- 여러 하위 값을 포함하는 상태 관리

#### [useRef](src/pages/HooksDemo/UseRefDemo.tsx)
- DOM 요소 직접 참조
- 리렌더링 없이 값 유지
- 타이머 ID, 이전 값 저장

### React 18/19 최신 Hooks

#### [useTransition](src/pages/HooksDemo/UseTransitionDemo.tsx)
- 우선순위가 낮은 상태 업데이트
- Concurrent Rendering
- UI 반응성 개선

#### [useDeferredValue](src/pages/HooksDemo/UseDeferredValueDemo.tsx)
- 값의 업데이트 지연
- 느린 렌더링 최적화
- useTransition과의 비교

#### [useId](src/pages/HooksDemo/UseIdDemo.tsx)
- 고유한 ID 생성
- Accessibility 속성 연결
- SSR에서의 hydration 문제 해결

#### [useOptimistic](src/pages/HooksDemo/UseOptimisticDemo.tsx) (React 19)
- 낙관적 UI 업데이트
- 서버 응답 대기 없이 즉시 피드백
- 메시지 전송, 좋아요 기능 등에 활용

### React 19 Form 기능

#### [Form Actions](src/pages/FormsDemo/FormActionsDemo.tsx)
- 폼 제출 처리의 개선
- 유효성 검사
- 비동기 작업 관리

#### [useFormStatus](src/pages/FormsDemo/UseFormStatusDemo.tsx)
- 폼 제출 상태 추적
- Submit 버튼 로딩 표시
- 폼 데이터 전송 중 UI 비활성화

### Concurrent Features

#### [Suspense](src/pages/SuspenseDemo/SuspenseBasicDemo.tsx)
- 데이터 페칭 중 로딩 표시
- Code Splitting (lazy loading)
- 컴포넌트 준비 대기

## 📖 추천 학습 순서

React를 처음 배우신다면 이 순서대로 학습하는 것을 추천합니다:

1. **기본 개념 이해** (30분)
   - useState로 상태 관리 시작
   - useEffect로 부수 효과 처리

2. **상태 관리 고도화** (1시간)
   - useContext로 전역 상태 공유
   - useReducer로 복잡한 로직 관리
   - useRef로 DOM 조작

3. **React 18 최신 기능** (1시간)
   - useTransition으로 성능 최적화
   - useDeferredValue로 렌더링 지연
   - useId로 접근성 개선

4. **React 19 신기능** (1시간)
   - useOptimistic으로 낙관적 업데이트
   - Form Actions로 폼 처리 개선
   - useFormStatus로 폼 상태 추적

5. **고급 패턴** (1시간)
   - Suspense로 비동기 처리
   - Concurrent Features 이해

## 🎯 각 페이지의 구성

모든 학습 페이지는 다음과 같은 구조를 따릅니다:

1. **개념 설명** - Hook이나 기능의 이론적 배경
2. **인터랙티브 예제** - 실제로 동작하는 예제로 직접 테스트
3. **코드 설명** - 구현 방식을 상세히 설명
4. **주요 포인트** - 핵심 내용 정리
5. **사용 시나리오** - 실무에서의 활용 예시

## 💡 학습 팁

### 1. 직접 수정해보기
각 페이지의 코드를 직접 수정하고 결과를 확인해보세요.
- Button의 동작 변경
- 상태 초기값 변경
- 조건부 렌더링 추가

### 2. 브라우저 개발자 도구 활용
- **Elements 탭**: DOM 구조 확인
- **Console 탭**: 에러 메시지와 console.log 확인
- **Profiler 탭**: 성능 분석

### 3. 공식 문서 참고
- [React 공식 문서](https://react.dev)
- [React 블로그](https://react.dev/blog)

### 4. 실습 프로젝트
배운 개념을 활용하여 작은 프로젝트를 만들어보세요:
- Todo 앱 (useState, useEffect)
- 테마 전환 (useContext)
- 검색 기능 (useTransition)
- 채팅 앱 (useOptimistic)

## 📁 프로젝트 구조

```
src/
├── pages/
│   ├── HomePage.tsx                    # 메인 페이지
│   ├── HooksDemo/
│   │   ├── UseStateDemo.tsx
│   │   ├── UseEffectDemo.tsx
│   │   ├── UseContextDemo.tsx
│   │   ├── UseReducerDemo.tsx
│   │   ├── UseRefDemo.tsx
│   │   ├── UseTransitionDemo.tsx
│   │   ├── UseDeferredValueDemo.tsx
│   │   ├── UseIdDemo.tsx
│   │   └── UseOptimisticDemo.tsx
│   ├── FormsDemo/
│   │   ├── FormActionsDemo.tsx
│   │   └── UseFormStatusDemo.tsx
│   └── SuspenseDemo/
│       └── SuspenseBasicDemo.tsx
├── components/                         # 재사용 가능한 컴포넌트
├── App.tsx                            # 라우팅 설정
├── App.css                            # 전역 스타일
├── index.css                          # 기본 스타일
└── main.tsx
```

## 🔧 주요 의존성

```json
{
  "react": "^19.2.4",
  "react-dom": "^19.2.4",
  "react-router-dom": "^7.13.0"
}
```

## 🌟 주요 특징

### 1. TypeScript 지원
- 완전한 타입 안정성
- 개발 중 에러 조기 발견
- IDE의 자동완성 지원

### 2. 다크 모드 지원
- 시스템 설정에 따른 자동 전환
- 깔끔한 UI/UX

### 3. 반응형 디자인
- 모든 기기에서 최적의 경험
- 모바일 친화적

### 4. Hot Module Replacement (HMR)
- 코드 수정 시 즉시 반영
- 빠른 개발 사이클

## 📖 추가 학습 자료

### 공식 자료
- [React 공식 튜토리얼](https://react.dev/learn)
- [React Hooks API Reference](https://react.dev/reference/react)

### 커뮤니티
- [React Discord](https://discord.gg/react)
- [Stack Overflow React 태그](https://stackoverflow.com/questions/tagged/reactjs)

## 🐛 문제 해결

### 포트 5173이 이미 사용 중인 경우

```bash
npm run dev -- --port 3000
```

### npm install 오류

```bash
rm -rf node_modules package-lock.json
npm install
```

---

**Happy Learning! 🎉**

React의 최신 기능들을 마스터하고 더 나은 개발자가 되길 바랍니다!
