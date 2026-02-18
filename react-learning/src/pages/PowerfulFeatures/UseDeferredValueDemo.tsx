import { useDeferredValue, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

export default function UseDeferredValueDemo() {
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);

  // 느린 필터링
  const items = useMemo(() => {
    const allItems = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`);

    // 실제 필터링 작업
    const filtered = allItems.filter((item) =>
      item.toLowerCase().includes(deferredSearchTerm.toLowerCase())
    );

    return filtered;
  }, [deferredSearchTerm]);

  const isStale = searchTerm !== deferredSearchTerm;

  return (
    <div className="demo-page">
      <Link to="/powerful-features" className="back-link">
        ← 뒤로 가기
      </Link>

      <h1>🎯 useDeferredValue - 느린 렌더링 최적화</h1>

      <section className="concept">
        <h2>개념</h2>
        <p>
          값의 업데이트를 지연시켜 느린 렌더링을 백그라운드에서 처리합니다.
        </p>
        <ul>
          <li>
            <strong>입력</strong>은 즉시 반응
          </li>
          <li>
            <strong>결과 계산</strong>은 백그라운드에서
          </li>
          <li>
            <strong>렌더링</strong>은 최우선으로
          </li>
        </ul>
        <p className="note">
          💡 <code>useTransition</code>과 비슷하지만, 값 기반이라는 점이 다릅니다.
        </p>
      </section>

      <section className="demo">
        <h2>예제: 대용량 리스트 검색</h2>
        <p>
          1000개 항목에서 검색합니다. 입력은 부드럽고 결과는 나중에 업데이트됩니다.
        </p>

        <div className="example">
          <div className="search-box">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="검색어를 입력하세요..."
              className="search-input"
            />
            {isStale && <span className="status">검색 중...</span>}
          </div>

          <div className="results">
            <p>
              검색 결과:{' '}
              <strong>{items.length}</strong>
              {isStale && <span className="stale"> (업데이트 중...)</span>}
            </p>
            <div className="result-list">
              {items.slice(0, 10).map((item, index) => (
                <div key={index} className="result-item">
                  {item}
                </div>
              ))}
              {items.length > 10 && (
                <p className="more">외 {items.length - 10}개 더...</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="comparison">
        <h2>useTransition vs useDeferredValue</h2>
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
              <td>기반</td>
              <td>상태 업데이트 함수 (setState)</td>
              <td>값</td>
            </tr>
            <tr>
              <td>사용 시점</td>
              <td>상태 변경 시</td>
              <td>외부 값 전달</td>
            </tr>
            <tr>
              <td>제어</td>
              <td>개발자</td>
              <td>자동</td>
            </tr>
            <tr>
              <td>pending 상태</td>
              <td>✅ 있음</td>
              <td>❌ 없음 (비교로 판단)</td>
            </tr>
            <tr>
              <td>예시</td>
              <td>검색 버튼 클릭</td>
              <td>props 변경</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="code-explanation">
        <h2>코드 설명</h2>
        <pre>{`import { useDeferredValue, useState, useMemo } from 'react';

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');

  // 값의 업데이트를 지연
  const deferredSearchTerm = useDeferredValue(searchTerm);

  // 느린 필터링 작업
  const results = useMemo(() => {
    const allItems = generateLargeList(); // 시간이 많이 걸림

    return allItems.filter(item =>
      item.includes(deferredSearchTerm)
    );
  }, [deferredSearchTerm]);

  // 입력값과 지연된 값이 다르면 업데이트 중
  const isStale = searchTerm !== deferredSearchTerm;

  return (
    <>
      <input
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="검색..."
      />

      {isStale && <p>검색 중...</p>}

      <ul>
        {results.map(item => <li key={item}>{item}</li>)}
      </ul>
    </>
  );
}`}