import { Link } from 'react-router-dom';
import './PowerfulFeatures.css';

export default function PowerfulFeaturesOverview() {
  const features = [
    {
      id: 1,
      title: 'useTransition',
      emoji: '⚡',
      description: '우선순위 렌더링 - 느린 작업을 백그라운드에서 처리',
      problem: '검색/필터링 시 입력이 끊기는 현상',
      solution: '중요한 UI는 즉시 업데이트, 느린 작업은 백그라운드에서',
      effect: '입력 반응성 ↑↑↑, 끊김 현상 제거',
      difficulty: '중간',
      link: '/powerful-features/use-transition',
    },
    {
      id: 2,
      title: 'useOptimistic',
      emoji: '✨',
      description: '낙관적 UI 업데이트 - 서버 응답 전에 UI 반영',
      problem: '버튼 클릭 후 응답까지 기다려야 함',
      solution: '즉시 UI를 업데이트하고 서버 응답 후 동기화',
      effect: '매우 빠른 반응, 부드러운 UX',
      difficulty: '쉬움',
      link: '/powerful-features/use-optimistic',
    },
    {
      id: 3,
      title: 'Server Actions',
      emoji: '🚀',
      description: '직접 서버 함수 호출 - API 엔드포인트 불필요',
      problem: 'API 엔드포인트를 매번 만들어야 함',
      solution: '클라이언트에서 직접 서버 함수 호출',
      effect: '코드량 ↓, 개발 속도 ↑',
      difficulty: '쉬움',
      link: '/powerful-features/server-actions',
    },
    {
      id: 4,
      title: 'Suspense + 스트리밍',
      emoji: '🌊',
      description: '스트리밍 렌더링 - 준비된 부분부터 먼저 보여주기',
      problem: '모든 콘텐츠가 로드될 때까지 대기',
      solution: '준비된 부분부터 먼저 렌더링, 나머지는 나중에',
      effect: '초기 로딩 시간 ↓, 체감 속도 ↑↑',
      difficulty: '어려움',
      link: '/powerful-features/suspense-streaming',
    },
    {
      id: 5,
      title: 'useDeferredValue',
      emoji: '🎯',
      description: '느린 렌더링 최적화 - 값의 업데이트 지연',
      problem: '긴 리스트 필터링 시 입력이 끊김',
      solution: '입력은 즉시 반응, 리스트는 백그라운드에서 업데이트',
      effect: '입력 끊김 현상 없음, 부드러운 경험',
      difficulty: '중간',
      link: '/powerful-features/use-deferred-value',
    },
  ];

  return (
    <div className="demo-page">
      <Link to="/" className="back-link">
        ← 홈으로
      </Link>

      <h1>🔥 React 19/18의 강력한 기능들</h1>

      <section className="concept">
        <h2>개요</h2>
        <p>
          React 18/19에서 도입된 혁신적인 기능들을 소개합니다.
          이 기능들은 사용자 경험을 극적으로 개선하고 개발을 더 쉽게 만들어줍니다.
        </p>
      </section>

      <section className="features-grid">
        <h2>5가지 강력한 기능</h2>
        <div className="grid">
          {features.map((feature) => (
            <Link
              key={feature.id}
              to={feature.link}
              className="feature-card"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="feature-emoji">{feature.emoji}</div>
              <h3>{feature.title}</h3>
              <p className="description">{feature.description}</p>

              <div className="details">
                <div className="detail-item">
                  <span className="label">문제:</span>
                  <span>{feature.problem}</span>
                </div>
                <div className="detail-item">
                  <span className="label">해결책:</span>
                  <span>{feature.solution}</span>
                </div>
                <div className="detail-item">
                  <span className="label">효과:</span>
                  <span>{feature.effect}</span>
                </div>
                <div className="detail-item">
                  <span className="label difficulty">난이도:</span>
                  <span>{feature.difficulty}</span>
                </div>
              </div>

              <div className="card-footer">→ 자세히 보기</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="comparison">
        <h2>기능별 비교표</h2>
        <table>
          <thead>
            <tr>
              <th>기능</th>
              <th>문제 해결</th>
              <th>난이도</th>
              <th>효과</th>
              <th>실무 빈도</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>useTransition</td>
              <td>느린 렌더링</td>
              <td>중간</td>
              <td>⭐⭐⭐</td>
              <td>자주 사용</td>
            </tr>
            <tr>
              <td>useOptimistic</td>
              <td>느린 응답</td>
              <td>쉬움</td>
              <td>⭐⭐⭐</td>
              <td>자주 사용</td>
            </tr>
            <tr>
              <td>Server Actions</td>
              <td>API 보일러플레이트</td>
              <td>쉬움</td>
              <td>⭐⭐⭐⭐</td>
              <td>매우 자주</td>
            </tr>
            <tr>
              <td>Suspense</td>
              <td>로딩 상태 관리</td>
              <td>어려움</td>
              <td>⭐⭐⭐</td>
              <td>가끔 사용</td>
            </tr>
            <tr>
              <td>useDeferredValue</td>
              <td>검색 성능</td>
              <td>중간</td>
              <td>⭐⭐⭐</td>
              <td>자주 사용</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="quick-start">
        <h2>🚀 빠른 시작</h2>
        <div className="quick-tips">
          <div className="tip">
            <strong>1️⃣ 검색/필터링이 느리다면?</strong>
            <p>
              → <code>useTransition</code> 또는 <code>useDeferredValue</code> 사용
            </p>
          </div>
          <div className="tip">
            <strong>2️⃣ 버튼 클릭이 느리게 반응한다면?</strong>
            <p>
              → <code>useOptimistic</code> 사용으로 즉시 UI 업데이트
            </p>
          </div>
          <div className="tip">
            <strong>3️⃣ API 엔드포인트 만들기 싫다면?</strong>
            <p>
              → <code>Server Actions</code>로 직접 함수 호출
            </p>
          </div>
          <div className="tip">
            <strong>4️⃣ 페이지가 너무 무겁다면?</strong>
            <p>
              → <code>Suspense</code>로 스트리밍 렌더링
            </p>
          </div>
        </div>
      </section>

      <section className="learning-path">
        <h2>📚 추천 학습 순서</h2>
        <ol>
          <li>
            <strong>useOptimistic</strong> - 가장 쉬우면서 효과 만점
          </li>
          <li>
            <strong>Server Actions</strong> - 개발 속도 극적 개선
          </li>
          <li>
            <strong>useTransition</strong> - 성능 최적화 기초
          </li>
          <li>
            <strong>useDeferredValue</strong> - 세밀한 성능 조정
          </li>
          <li>
            <strong>Suspense</strong> - 고급 패턴, 나중에 학습
          </li>
        </ol>
      </section>
    </div>
  );
}
