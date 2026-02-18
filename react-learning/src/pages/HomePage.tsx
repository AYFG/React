import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="home-page">
      <header>
        <h1>React 최신 기능 학습 프로젝트</h1>
        <p>React 18/19의 최신 기능들을 체계적으로 학습해보세요!</p>
      </header>

      <main>
        <section className="learning-section">
          <h2>📚 기본 Hooks</h2>
          <p>React의 기본적인 Hooks를 학습합니다.</p>
          <ul>
            <li><Link to="/hooks/use-state">useState - 상태 관리 기초</Link></li>
            <li><Link to="/hooks/use-effect">useEffect - 사이드 이펙트 처리</Link></li>
            <li><Link to="/hooks/use-context">useContext - 전역 상태 공유</Link></li>
            <li><Link to="/hooks/use-reducer">useReducer - 복잡한 상태 로직</Link></li>
            <li><Link to="/hooks/use-ref">useRef - DOM 참조 및 값 유지</Link></li>
          </ul>
        </section>

        <section className="learning-section">
          <h2>🚀 React 18/19 최신 Hooks</h2>
          <p>React 18과 19에서 추가된 최신 Hooks를 학습합니다.</p>
          <ul>
            <li><Link to="/hooks/use-transition">useTransition - 우선순위가 낮은 상태 업데이트</Link></li>
            <li><Link to="/hooks/use-deferred-value">useDeferredValue - 값 업데이트 지연</Link></li>
            <li><Link to="/hooks/use-id">useId - 고유 ID 생성</Link></li>
          </ul>
        </section>

        <section className="learning-section">
          <h2>⚡ React 19 신기능</h2>
          <p>React 19에서 새롭게 추가된 기능들을 학습합니다.</p>
          <ul>
            <li><Link to="/hooks/use-optimistic">useOptimistic - 낙관적 UI 업데이트</Link></li>
            <li><Link to="/forms/actions">Form Actions - 폼 처리의 새로운 패턴</Link></li>
            <li><Link to="/forms/use-form-status">useFormStatus - 폼 상태 추적</Link></li>
          </ul>
        </section>

        <section className="learning-section">
          <h2>🎯 Concurrent Features</h2>
          <p>React의 동시성 기능을 학습합니다.</p>
          <ul>
            <li><Link to="/suspense/basic">Suspense - 데이터 페칭</Link></li>
            <li><Link to="/suspense/transitions">Transitions - UX 개선</Link></li>
          </ul>
        </section>

        <section className="learning-section powerful-features">
          <h2>🔥 React 19/18의 강력한 기능들</h2>
          <p>성능 최적화와 개발 효율을 극적으로 개선하는 고급 기능들을 학습합니다.</p>
          <ul>
            <li><Link to="/powerful-features">📋 전체 개요 및 비교</Link></li>
            <li><Link to="/powerful-features/use-transition">⚡ useTransition - 우선순위 렌더링</Link></li>
            <li><Link to="/powerful-features/use-optimistic">✨ useOptimistic - 낙관적 UI</Link></li>
            <li><Link to="/powerful-features/server-actions">🚀 Server Actions - 직접 함수 호출</Link></li>
            <li><Link to="/powerful-features/use-deferred-value">🎯 useDeferredValue - 값 지연</Link></li>
            <li><Link to="/powerful-features/suspense-streaming">🌊 Suspense - 스트리밍 렌더링</Link></li>
          </ul>
        </section>
      </main>

      <footer>
        <h3>📖 추천 학습 순서</h3>
        <ol>
          <li>기본 Hooks (useState, useEffect)부터 시작</li>
          <li>useContext, useReducer로 상태 관리 학습</li>
          <li>React 18/19 최신 Hooks 학습</li>
          <li>React 19 신기능 및 Concurrent Features 학습</li>
        </ol>

        <div className="resources">
          <h3>🔗 참고 자료</h3>
          <ul>
            <li><a href="https://react.dev" target="_blank" rel="noopener noreferrer">React 공식 문서</a></li>
            <li><a href="https://react.dev/blog" target="_blank" rel="noopener noreferrer">React 블로그</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
