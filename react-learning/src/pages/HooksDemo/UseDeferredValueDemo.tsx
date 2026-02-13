import { useState, useDeferredValue, useMemo } from 'react';
import { Link } from 'react-router-dom';

// 무거운 렌더링을 시뮬레이션하는 컴포넌트
function SearchResults({ query }: { query: string }) {
  const items = useMemo(() => {
    const results = [];
    for (let i = 0; i < 10000; i++) {
      if (query === '' || `아이템 ${i}`.includes(query)) {
        results.push(`아이템 ${i}`);
      }
    }
    return results.slice(0, 100); // 최대 100개만 표시
  }, [query]);

  return (
    <div className="search-results">
      <p>검색 결과: {items.length}개</p>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function UseDeferredValueDemo() {
  const [input, setInput] = useState('');

  // useDeferredValue를 사용한 지연된 값
  const deferredInput = useDeferredValue(input);

  // 지연 여부 확인
  const isStale = input !== deferredInput;

  return (
    <div className="demo-page">
      <Link to="/" className="back-link">← 홈으로</Link>

      <h1>useDeferredValue Hook</h1>

      <section className="concept">
        <h2>개념</h2>
        <p>
          <code>useDeferredValue</code>는 값의 업데이트를 지연시킬 수 있는 React 18의 Hook입니다.
        </p>
        <p>
          UI의 일부가 느리게 렌더링될 때, 빠른 부분(예: 입력 필드)은 즉시 업데이트하고
          느린 부분(예: 검색 결과)은 나중에 업데이트하여 사용자 경험을 개선합니다.
        </p>
        <p>
          <code>useTransition</code>과 유사하지만, 상태 설정 코드를 제어할 수 없을 때 유용합니다.
        </p>
      </section>

      <section className="demo">
        <h2>예제</h2>

        <div className="example">
          <h3>검색 필터링</h3>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="검색어를 입력하세요..."
            className="large-input"
          />

          {isStale && (
            <p className="pending-indicator">검색 결과 업데이트 중...</p>
          )}

          <div className={isStale ? 'stale' : ''}>
            <SearchResults query={deferredInput} />
          </div>
        </div>

        <div className="comparison">
          <h3>값 비교</h3>
          <p>현재 입력 값: <strong>{input || '(없음)'}</strong></p>
          <p>지연된 값: <strong>{deferredInput || '(없음)'}</strong></p>
          <p>상태: {isStale ? '🔄 업데이트 대기 중' : '✅ 동기화됨'}</p>
        </div>
      </section>

      <section className="code-explanation">
        <h2>코드 설명</h2>
        <pre>{`import { useState, useDeferredValue } from 'react';

function SearchPage() {
  const [input, setInput] = useState('');

  // input의 지연된 버전
  const deferredInput = useDeferredValue(input);

  // 지연 여부 확인
  const isStale = input !== deferredInput;

  return (
    <div>
      {/* 입력은 즉시 업데이트 */}
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
      />

      {isStale && <Spinner />}

      {/* 검색 결과는 지연된 값으로 렌더링 */}
      <SearchResults query={deferredInput} />
    </div>
  );
}`}</pre>

        <h3>주요 포인트</h3>
        <ul>
          <li><code>useDeferredValue(value)</code>는 지연된 버전의 값을 반환합니다</li>
          <li>초기 렌더링에서는 원본 값과 동일한 값을 반환합니다</li>
          <li>업데이트 중에는 이전 값을 유지하다가, 더 긴급한 업데이트가 없을 때 새 값으로 업데이트합니다</li>
          <li>원본 값과 지연된 값을 비교하여 업데이트 진행 중인지 확인할 수 있습니다</li>
          <li>값을 props로 받아서 제어할 수 없을 때 <code>useTransition</code> 대신 사용합니다</li>
          <li>Concurrent Rendering이 활성화되어야 작동합니다 (React 18+)</li>
        </ul>

        <h3>useTransition vs useDeferredValue</h3>
        <table>
          <thead>
            <tr>
              <th>특성</th>
              <th>useTransition</th>
              <th>useDeferredValue</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>사용 방법</td>
              <td>상태 업데이트 코드를 감쌈</td>
              <td>값을 지연시킴</td>
            </tr>
            <tr>
              <td>적합한 경우</td>
              <td>상태 설정 코드를 제어 가능</td>
              <td>값을 props로 받음</td>
            </tr>
            <tr>
              <td>isPending</td>
              <td>제공됨</td>
              <td>직접 비교 필요</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
