import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function UseRefDemo() {
  const [count, setCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const renderCountRef = useRef(0);
  const previousCountRef = useRef<number>();

  // 렌더링 횟수 추적
  useEffect(() => {
    renderCountRef.current += 1;
  });

  // 이전 값 저장
  useEffect(() => {
    previousCountRef.current = count;
  }, [count]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const scrollToInput = () => {
    inputRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="demo-page">
      <Link to="/" className="back-link">← 홈으로</Link>

      <h1>useRef Hook</h1>

      <section className="concept">
        <h2>개념</h2>
        <p>
          <code>useRef</code>는 두 가지 주요 용도로 사용됩니다:
        </p>
        <ol>
          <li><strong>DOM 요소 참조</strong>: DOM 노드에 직접 접근할 때</li>
          <li><strong>값 유지</strong>: 리렌더링 사이에 값을 유지하되, 변경해도 리렌더링을 트리거하지 않을 때</li>
        </ol>
        <p>
          <code>useRef</code>로 생성한 ref 객체는 컴포넌트의 전체 생명주기 동안 유지됩니다.
        </p>
      </section>

      <section className="demo">
        <h2>예제</h2>

        <div className="example">
          <h3>1. DOM 요소 참조</h3>
          <input
            ref={inputRef}
            type="text"
            placeholder="이 input에 포커스하기"
          />
          <div className="button-group">
            <button onClick={focusInput}>포커스</button>
            <button onClick={scrollToInput}>스크롤</button>
          </div>
        </div>

        <div className="example">
          <h3>2. 렌더링 횟수 추적</h3>
          <p>이 컴포넌트는 {renderCountRef.current}번 렌더링되었습니다.</p>
          <p className="hint">
            (useRef는 값이 변경되어도 리렌더링을 발생시키지 않습니다)
          </p>
        </div>

        <div className="example">
          <h3>3. 이전 값 저장</h3>
          <p>현재 카운트: {count}</p>
          <p>이전 카운트: {previousCountRef.current ?? '없음'}</p>
          <button onClick={() => setCount(count + 1)}>증가</button>
        </div>

        <div className="example">
          <h3>useState vs useRef 비교</h3>
          <table>
            <thead>
              <tr>
                <th>특성</th>
                <th>useState</th>
                <th>useRef</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>값 변경시 리렌더링</td>
                <td>O</td>
                <td>X</td>
              </tr>
              <tr>
                <td>렌더링 간 값 유지</td>
                <td>O</td>
                <td>O</td>
              </tr>
              <tr>
                <td>DOM 접근</td>
                <td>X</td>
                <td>O</td>
              </tr>
              <tr>
                <td>사용 예시</td>
                <td>UI 상태</td>
                <td>타이머 ID, 이전 값</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="code-explanation">
        <h2>코드 설명</h2>
        <pre>{`import { useRef } from 'react';

function Example() {
  // 1. DOM 요소 참조
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  // 2. 값 저장 (리렌더링 없음)
  const countRef = useRef(0);

  const increment = () => {
    countRef.current += 1; // 리렌더링 X
    console.log(countRef.current);
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={focusInput}>포커스</button>
      <button onClick={increment}>증가 (렌더링 없음)</button>
    </div>
  );
}`}</pre>

        <h3>주요 포인트</h3>
        <ul>
          <li><code>useRef</code>는 <code>{`{ current: initialValue }`}</code> 형태의 객체를 반환합니다</li>
          <li><code>.current</code> 프로퍼티를 통해 값에 접근하고 변경할 수 있습니다</li>
          <li>ref의 값이 변경되어도 컴포넌트는 리렌더링되지 않습니다</li>
          <li>DOM 요소에 ref 속성으로 전달하면 해당 요소를 참조할 수 있습니다</li>
          <li>렌더링 중에는 ref.current를 읽거나 쓰지 마세요 (부수 효과는 useEffect에서)</li>
          <li>타이머 ID, 이전 값, 렌더링 횟수 등을 저장하는 데 유용합니다</li>
        </ul>
      </section>
    </div>
  );
}
