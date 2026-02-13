import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function UseStateDemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div className="demo-page">
      <Link to="/" className="back-link">← 홈으로</Link>

      <h1>useState Hook</h1>

      <section className="concept">
        <h2>개념</h2>
        <p>
          <code>useState</code>는 React의 가장 기본적인 Hook으로, 함수 컴포넌트에서 상태(state)를 관리할 수 있게 해줍니다.
        </p>
        <p>
          상태가 변경되면 컴포넌트가 자동으로 리렌더링되어 UI가 업데이트됩니다.
        </p>
      </section>

      <section className="demo">
        <h2>예제</h2>

        <div className="example">
          <h3>1. 카운터</h3>
          <p>현재 카운트: {count}</p>
          <div className="button-group">
            <button onClick={() => setCount(count + 1)}>증가</button>
            <button onClick={() => setCount(count - 1)}>감소</button>
            <button onClick={() => setCount(0)}>초기화</button>
          </div>
        </div>

        <div className="example">
          <h3>2. 텍스트 입력</h3>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="텍스트를 입력하세요"
          />
          <p>입력한 텍스트: {text || '(없음)'}</p>
          <p>글자 수: {text.length}</p>
        </div>

        <div className="example">
          <h3>3. 토글</h3>
          <button onClick={() => setIsToggled(!isToggled)}>
            {isToggled ? 'ON' : 'OFF'}
          </button>
          {isToggled && <p>토글이 켜져있습니다!</p>}
        </div>
      </section>

      <section className="code-explanation">
        <h2>코드 설명</h2>
        <pre>{`import { useState } from 'react';

function Counter() {
  // 상태 선언: [현재값, 업데이트함수] = useState(초기값)
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}`}</pre>

        <h3>주요 포인트</h3>
        <ul>
          <li><code>useState</code>는 배열을 반환합니다: [현재 상태 값, 상태를 업데이트하는 함수]</li>
          <li>상태 업데이트 함수를 호출하면 컴포넌트가 리렌더링됩니다</li>
          <li>이전 상태를 기반으로 업데이트할 때는 함수형 업데이트를 사용하세요: <code>setCount(prev =&gt; prev + 1)</code></li>
          <li>객체나 배열 상태는 불변성을 유지하며 업데이트해야 합니다</li>
        </ul>
      </section>
    </div>
  );
}
