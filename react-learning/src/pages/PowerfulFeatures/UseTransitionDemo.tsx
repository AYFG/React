import { useTransition, useState } from 'react';
import { Link } from 'react-router-dom';

export default function UseTransitionDemo() {
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<string[]>([]);

  // 느린 검색 시뮬레이션
  const slowSearch = (query: string) => {
    const allItems = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`);
    return allItems.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // 느린 작업을 백그라운드에서 처리
    startTransition(() => {
      // 느린 필터링 작업
      const filtered = slowSearch(value);
      setResults(filtered);
    });
  };

  return (
    <div className="demo-page">
      <Link to="/powerful-features" className="back-link">
        ← 뒤로 가기
      </Link>

      <h1>⚡ useTransition - 우선순위 렌더링</h1>

      <section className="concept">
        <h2>개념</h2>
        <p>
          <code>useTransition</code>은 UI를 끊지 않고 오래 걸리는 상태 업데이트를
          처리합니다.
        </p>
        <ul>
          <li>
            <strong>긴급 업데이트</strong> (입력): 즉시 처리
          </li>
          <li>
            <strong>비긴급 업데이트</strong> (검색결과): 백그라운드에서 처리
          </li>
        </ul>
      </section>

      <section className="demo">
        <h2>예제: 빠른 검색</h2>
        <p>
          1000개 항목을 검색합니다. <code>useTransition</code> 없으면 입력이
          끊기지만, 사용하면 부드럽습니다.
        </p>

        <div className="example">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="검색어를 입력하세요..."
            className="search-input"
          />

          {isPending && <p className="loading">검색 중...</p>}

          <div className="results">
            <p>검색 결과: {results.length}개</p>
            <div className="result-list">
              {results.slice(0, 10).map((result, index) => (
                <div key={index} className="result-item">
                  {result}
                </div>
              ))}
              {results.length > 10 && (
                <p className="more">외 {results.length - 10}개 더...</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="code-explanation">
        <h2>코드 설명</h2>
        <pre>{`import { useTransition, useState } from 'react';

function SearchComponent() {
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<string[]>([]);

  // 느린 검색 함수
  const slowSearch = (query: string) => {
    const allItems = Array.from({ length: 1000 }, (_, i) => \`Item \${i + 1}\`);
    return allItems.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // 입력은 즉시 업데이트
    setSearchTerm(value);

    // 검색 결과는 백그라운드에서 처리
    startTransition(() => {
      const filtered = slowSearch(value);
      setResults(filtered);
    });
  };

  return (
    <>
      <input value={searchTerm} onChange={handleSearch} />
      {isPending && <p>검색 중...</p>}
      <div>{results.map((r) => <div key={r}>{r}</div>)}</div>
    </>
  );
}`}