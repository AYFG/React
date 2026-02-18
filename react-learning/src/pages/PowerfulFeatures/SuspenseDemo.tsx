import { Suspense, useState } from 'react';
import { Link } from 'react-router-dom';

// 시뮬레이션: 데이터 페칭
const fetchData = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), delay);
  });
};

// Suspense와 함께 사용할 컴포넌트
function SlowComponent({ delay }: { delay: number }) {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!isLoaded) {
    // 실제로는 throw promise를 사용하지만, 여기서는 상태로 시뮬레이션
    fetchData(delay).then(() => setIsLoaded(true));

    return <div>로딩 중...</div>;
  }

  return <div className="loaded">✅ 로드 완료!</div>;
}

export default function SuspenseDemo() {
  const [showContent, setShowContent] = useState(false);

  return (
    <div className="demo-page">
      <Link to="/powerful-features" className="back-link">
        ← 뒤로 가기
      </Link>

      <h1>🌊 Suspense + 스트리밍</h1>

      <section className="concept">
        <h2>개념</h2>
        <p>
          Suspense는 컴포넌트의 렌더링을 대기하고, 로딩 중에 폴백 UI를 표시합니다.
          스트리밍으로 준비된 부분부터 먼저 브라우저에 전송할 수 있습니다.
        </p>
        <ul>
          <li>
            <strong>폴백 UI</strong>: 로딩 중 표시할 내용
          </li>
          <li>
            <strong>스트리밍</strong>: 준비된 부분부터 먼저 보내기
          </li>
          <li>
            <strong>초기 로딩</strong>: 모든 콘텐츠 대기 안 함
          </li>
        </ul>
      </section>

      <section className="demo">
        <h2>예제: 페이지 로딩</h2>
        <button
          onClick={() => setShowContent(!showContent)}
          className="toggle-button"
        >
          {showContent ? '컨텐츠 숨기기' : '컨텐츠 보기'}
        </button>

        {showContent && (
          <div className="example">
            <h3>페이지 컨텐츠</h3>

            <div className="section fast">
              <h4>⚡ 빠른 섹션 (0.5초)</h4>
              <Suspense fallback={<p>로딩 중...</p>}>
                <SlowComponent delay={500} />
              </Suspense>
            </div>

            <div className="section medium">
              <h4>⏱️ 중간 속도 섹션 (2초)</h4>
              <Suspense fallback={<p>로딩 중...</p>}>
                <SlowComponent delay={2000} />
              </Suspense>
            </div>

            <div className="section slow">
              <h4>🐢 느린 섹션 (4초)</h4>
              <Suspense fallback={<p>로딩 중...</p>}>
                <SlowComponent delay={4000} />
              </Suspense>
            </div>
          </div>
        )}
      </section>

      <section className="benefits">
        <h2>Suspense의 장점</h2>
        <div className="benefits-grid">
          <div className="benefit">
            <h4>1️⃣ 부분 로딩</h4>
            <p>빠른 부분은 먼저 표시, 느린 부분은 나중에 표시</p>
          </div>
          <div className="benefit">
            <h4>2️⃣ 초기 로드 시간</h4>
            <p>모든 데이터를 기다리지 않아도 됨</p>
          </div>
          <div className="benefit">
            <h4>3️⃣ 스트리밍</h4>
            <p>서버에서 준비되는 대로 클라이언트에 전송</p>
          </div>
          <div className="benefit">
            <h4>4️⃣ 개선된 UX</h4>
            <p>사용자가 진행 상황을 시각적으로 확인 가능</p>
          </div>
        </div>
      </section>

      <section className="code-explanation">
        <h2>코드 설명</h2>
        <pre>{`import { Suspense } from 'react';

// 느린 컴포넌트
function SlowComponent() {
  // 실제로는 throw promise를 사용
  // 여기서는 예시만 보여줍니다
  const data = fetchData(); // 데이터 페칭

  return <div>{data}</div>;
}

// Suspense 래퍼
function Page() {
  return (
    <div>
      <h1>페이지 제목</h1>

      {/* 빠른 섹션: 즉시 표시 */}
      <div>빠른 내용</div>

      {/* 느린 섹션: Suspense로 감싸기 */}
      <Suspense fallback={<p>로딩 중...</p>}>
        <SlowComponent />
      </Suspense>
    </div>
  );
}

// Next.js 13+ Server Components와 함께:
import { Suspense } from 'react';

export default function Page() {
  return (
    <>
      <Header />

      <Suspense fallback={<div>로딩 중...</div>}>
        <SlowData />
      </Suspense>

      <Suspense fallback={<div>로딩 중...</div>}>
        <AnotherSlowData />
      </Suspense>

      <Footer />
    </>
  );
}`}