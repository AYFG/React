import { Suspense, useState } from 'react';
import { Link } from 'react-router-dom';

// 데이터를 비동기로 가져오는 함수
function fetchData(delay: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`데이터 로드 완료! (${delay}ms 소요)`);
    }, delay);
  });
}

// Promise를 래핑하여 Suspense와 함께 사용
function wrapPromise<T>(promise: Promise<T>) {
  let status = 'pending';
  let result: T;
  let error: any;

  const suspender = promise.then(
    (data) => {
      status = 'success';
      result = data;
    },
    (err) => {
      status = 'error';
      error = err;
    }
  );

  return {
    read(): T {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw error;
      } else {
        return result;
      }
    },
  };
}

// Resource 생성
function createResource(delay: number) {
  return wrapPromise(fetchData(delay));
}

// 데이터를 읽는 컴포넌트
function DataDisplay({ resource }: { resource: ReturnType<typeof createResource> }) {
  const data = resource.read(); // Suspense를 트리거
  return <div className="data-display">{data}</div>;
}

export default function SuspenseBasicDemo() {
  const [resource, setResource] = useState(createResource(2000));
  const [showData, setShowData] = useState(false);

  const handleReload = () => {
    setShowData(false);
    setTimeout(() => {
      setResource(createResource(2000));
      setShowData(true);
    }, 100);
  };

  return (
    <div className="demo-page">
      <Link to="/" className="back-link">← 홈으로</Link>

      <h1>Suspense - 기본 사용법</h1>

      <section className="concept">
        <h2>개념</h2>
        <p>
          <code>Suspense</code>는 컴포넌트가 렌더링되기 전에 무언가를 "기다려야" 할 때 사용하는 React의 기능입니다.
        </p>
        <p>
          주로 데이터 페칭, 코드 스플리팅(lazy loading) 등에 사용됩니다.
          자식 컴포넌트가 준비될 때까지 fallback UI를 표시합니다.
        </p>
        <p>
          React 18+에서는 Suspense가 Concurrent Rendering과 함께 동작하여
          더 나은 사용자 경험을 제공합니다.
        </p>
      </section>

      <section className="demo">
        <h2>예제</h2>

        <div className="example">
          <h3>데이터 페칭</h3>

          <button onClick={() => setShowData(!showData)}>
            {showData ? '데이터 숨기기' : '데이터 불러오기'}
          </button>

          <button onClick={handleReload} disabled={!showData}>
            다시 불러오기
          </button>

          {showData && (
            <Suspense fallback={<LoadingFallback />}>
              <DataDisplay resource={resource} />
            </Suspense>
          )}
        </div>

        <div className="example">
          <h3>Code Splitting (Lazy Loading)</h3>
          <LazyComponentExample />
        </div>
      </section>

      <section className="code-explanation">
        <h2>코드 설명</h2>
        <pre>{`import { Suspense, lazy } from 'react';

// 1. 데이터 페칭
function UserProfile({ userId }) {
  const user = fetchUser(userId); // Promise를 throw

  return <div>{user.name}</div>;
}

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <UserProfile userId={1} />
    </Suspense>
  );
}

// 2. Code Splitting
const LazyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
    </Suspense>
  );
}`}</pre>

        <h3>주요 포인트</h3>
        <ul>
          <li><code>Suspense</code>는 자식 컴포넌트가 준비될 때까지 fallback을 표시합니다</li>
          <li>여러 컴포넌트를 하나의 Suspense로 감쌀 수 있습니다</li>
          <li>Suspense는 중첩될 수 있으며, 가장 가까운 Suspense boundary가 작동합니다</li>
          <li>React.lazy()와 함께 사용하여 코드 스플리팅이 가능합니다</li>
          <li>데이터 페칭 라이브러리(React Query, SWR 등)와 함께 사용할 수 있습니다</li>
        </ul>

        <h3>Suspense가 작동하는 방식</h3>
        <ol>
          <li>컴포넌트가 렌더링 중 Promise를 throw합니다</li>
          <li>React가 Promise를 catch하고 fallback을 표시합니다</li>
          <li>Promise가 resolve되면 컴포넌트를 다시 렌더링합니다</li>
        </ol>

        <h3>사용 시나리오</h3>
        <ul>
          <li>데이터 페칭 (API 호출)</li>
          <li>Code Splitting (lazy loading)</li>
          <li>이미지 로딩</li>
          <li>폰트 로딩</li>
        </ul>
      </section>
    </div>
  );
}

// 로딩 fallback 컴포넌트
function LoadingFallback() {
  return (
    <div className="loading-fallback">
      <div className="spinner"></div>
      <p>데이터를 불러오는 중...</p>
    </div>
  );
}

// Lazy Loading 예제
function LazyComponentExample() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button onClick={() => setShow(!show)}>
        {show ? '컴포넌트 숨기기' : 'Lazy 컴포넌트 로드'}
      </button>

      {show && (
        <Suspense fallback={<div>컴포넌트 로딩 중...</div>}>
          <HeavyComponent />
        </Suspense>
      )}
    </div>
  );
}

// 무거운 컴포넌트 시뮬레이션
function HeavyComponent() {
  return (
    <div className="heavy-component">
      <h4>무거운 컴포넌트</h4>
      <p>이 컴포넌트는 필요할 때만 로드됩니다 (Code Splitting)</p>
    </div>
  );
}
