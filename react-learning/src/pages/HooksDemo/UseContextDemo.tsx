import { createContext, useContext, useState } from 'react';
import { Link } from 'react-router-dom';

// 테마 Context 생성
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 사용자 Context 생성
interface User {
  name: string;
  role: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// 테마를 사용하는 컴포넌트
function ThemedComponent() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('ThemeContext를 찾을 수 없습니다');
  }

  const { theme, toggleTheme } = context;

  return (
    <div className={`themed-box ${theme}`}>
      <p>현재 테마: {theme === 'light' ? '라이트' : '다크'}</p>
      <button onClick={toggleTheme}>테마 전환</button>
    </div>
  );
}

// 사용자 정보를 표시하는 컴포넌트
function UserInfo() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('UserContext를 찾을 수 없습니다');
  }

  const { user, setUser } = context;

  return (
    <div className="user-info">
      {user ? (
        <>
          <p>이름: {user.name}</p>
          <p>역할: {user.role}</p>
          <button onClick={() => setUser(null)}>로그아웃</button>
        </>
      ) : (
        <button onClick={() => setUser({ name: '홍길동', role: '개발자' })}>
          로그인
        </button>
      )}
    </div>
  );
}

export default function UseContextDemo() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [user, setUser] = useState<User | null>(null);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="demo-page">
      <Link to="/" className="back-link">← 홈으로</Link>

      <h1>useContext Hook</h1>

      <section className="concept">
        <h2>개념</h2>
        <p>
          <code>useContext</code>는 React Context를 통해 전역 상태를 공유할 수 있게 해주는 Hook입니다.
        </p>
        <p>
          props drilling(여러 단계의 컴포넌트를 거쳐 props를 전달하는 것) 없이 깊은 곳의 컴포넌트에 데이터를 전달할 수 있습니다.
        </p>
      </section>

      <section className="demo">
        <h2>예제</h2>

        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <UserContext.Provider value={{ user, setUser }}>
            <div className="example">
              <h3>1. 테마 전환</h3>
              <ThemedComponent />
            </div>

            <div className="example">
              <h3>2. 사용자 정보</h3>
              <UserInfo />
            </div>
          </UserContext.Provider>
        </ThemeContext.Provider>
      </section>

      <section className="code-explanation">
        <h2>코드 설명</h2>
        <pre>{`import { createContext, useContext, useState } from 'react';

// 1. Context 생성
const ThemeContext = createContext(undefined);

// 2. Provider로 값 제공
function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ChildComponent />
    </ThemeContext.Provider>
  );
}

// 3. useContext로 값 사용
function ChildComponent() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div>
      <p>현재 테마: {theme}</p>
      <button onClick={() => setTheme('dark')}>
        다크 모드로 전환
      </button>
    </div>
  );
}`}</pre>

        <h3>주요 포인트</h3>
        <ul>
          <li><code>createContext</code>로 Context를 생성합니다</li>
          <li><code>Context.Provider</code>로 하위 컴포넌트에 값을 제공합니다</li>
          <li><code>useContext(Context)</code>로 Context의 값을 읽습니다</li>
          <li>Provider 외부에서 useContext를 사용하면 기본값이 반환됩니다</li>
          <li>Context 값이 변경되면 useContext를 사용하는 모든 컴포넌트가 리렌더링됩니다</li>
          <li>성능 최적화가 필요한 경우 Context를 분리하거나 useMemo를 사용하세요</li>
        </ul>
      </section>
    </div>
  );
}
