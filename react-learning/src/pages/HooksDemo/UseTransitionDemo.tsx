import { useState, useTransition } from 'react';
import { Link } from 'react-router-dom';

// 무거운 렌더링을 시뮬레이션하는 컴포넌트
function SlowList({ text }: { text: string }) {
  const items = [];
  for (let i = 0; i < 250; i++) {
    items.push(
      <div key={i} className="list-item">
        {text} - 항목 {i}
      </div>
    );
  }
  return <div className="slow-list">{items}</div>;
}

export default function UseTransitionDemo() {
  const [inputValue, setInputValue] = useState('');
  const [listText, setListText] = useState('');
  const [isPending, startTransition] = useTransition();

  // useTransition 없이 업데이트
  const handleChangeWithoutTransition = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setListText(value); // 즉시 업데이트 - 느려질 수 있음
  };

  // useTransition과 함께 업데이트
  const handleChangeWithTransition = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value); // 즉시 업데이트 (우선순위 높음)

    startTransition(() => {
      setListText(value); // 지연된 업데이트 (우선순위 낮음)
    });
  };

  const [mode, setMode] = useState<'without' | 'with'>('without');

  return (
    <div className="demo-page">
      <Link to="/" className="back-link">← 홈으로</Link>

      <h1>useTransition Hook</h1>

      <section className="concept">
        <h2>개념</h2>
        <p>
          <code>useTransition</code>은 UI를 차단하지 않고 상태를 업데이트할 수 있게 해주는 React 18의 Hook입니다.
        </p>
        <p>
          일부 상태 업데이트를 "전환(transition)"으로 표시하여 우선순위를 낮출 수 있습니다.
          이를 통해 더 중요한 업데이트(예: 사용자 입력)가 먼저 처리되도록 할 수 있습니다.
        </p>
      </section>

      <section className="demo">
        <h2>예제</h2>

        <div className="mode-selector">
          <label>
            <input
              type="radio"
              checked={mode === 'without'}
              onChange={() => setMode('without')}
            />
            useTransition 없이
          </label>
          <label>
            <input
              type="radio"
              checked={mode === 'with'}
              onChange={() => setMode('with')}
            />
            useTransition 사용
          </label>
        </div>

        <div className="example">
          <h3>입력 필드와 무거운 리스트</h3>
          <p className="hint">
            {mode === 'without'
              ? '⚠️ 타이핑이 느리게 느껴질 수 있습니다 (입력과 렌더링이 동시에)'
              : '✅ 타이핑이 부드럽습니다 (입력이 우선, 렌더링은 나중에)'}
          </p>

          <input
            type="text"
            value={inputValue}
            onChange={
              mode === 'without'
                ? handleChangeWithoutTransition
                : handleChangeWithTransition
            }
            placeholder="텍스트를 입력해보세요..."
            className="large-input"
          />

          {isPending && <p className="pending-indicator">업데이트 중...</p>}

          <div className="list-container">
            <SlowList text={listText} />
          </div>
        </div>
      </section>

      <section className="code-explanation">
        <h2>코드 설명</h2>
        <pre>{`import { useState, useTransition } from 'react';

function SearchResults() {
  const [input, setInput] = useState('');
  const [list, setList] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    setInput(e.target.value); // 즉시 업데이트 (우선순위 높음)

    startTransition(() => {
      setList(e.target.value); // 전환 (우선순위 낮음)
    });
  };

  return (
    <div>
      <input value={input} onChange={handleChange} />
      {isPending && <Spinner />}
      <HeavyList items={list} />
    </div>
  );
}`}</pre>

        <h3>주요 포인트</h3>
        <ul>
          <li><code>useTransition</code>은 [isPending, startTransition]을 반환합니다</li>
          <li><code>startTransition</code> 내부의 상태 업데이트는 우선순위가 낮아집니다</li>
          <li><code>isPending</code>은 전환이 진행 중인지 여부를 나타냅니다</li>
          <li>사용자 입력 같은 긴급한 업데이트는 전환 외부에서 처리합니다</li>
          <li>무거운 렌더링이나 계산은 전환 내부에서 처리합니다</li>
          <li>React는 긴급한 업데이트를 먼저 처리하고, 전환은 나중에 처리합니다</li>
          <li>Concurrent Rendering이 활성화되어야 작동합니다 (React 18+)</li>
        </ul>

        <h3>사용 시나리오</h3>
        <ul>
          <li>검색어 입력 시 결과 목록 필터링</li>
          <li>탭 전환 (현재 탭은 즉시 표시, 새 탭 내용은 천천히 로드)</li>
          <li>대량의 데이터 렌더링</li>
        </ul>
      </section>
    </div>
  );
}
