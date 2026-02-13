import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function UseEffectDemo() {
  const [count, setCount] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [data, setData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 예제 1: count가 변경될 때마다 실행
  useEffect(() => {
    document.title = `카운트: ${count}`;
  }, [count]);

  // 예제 2: 타이머 (컴포넌트 마운트시 시작, 언마운트시 정리)
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // 클린업 함수
    return () => clearInterval(interval);
  }, []);

  // 예제 3: 데이터 페칭 시뮬레이션
  const fetchData = () => {
    setIsLoading(true);
    setData(null);

    // 실제로는 fetch나 axios를 사용
    setTimeout(() => {
      setData('데이터 로딩 완료!');
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="demo-page">
      <Link to="/" className="back-link">← 홈으로</Link>

      <h1>useEffect Hook</h1>

      <section className="concept">
        <h2>개념</h2>
        <p>
          <code>useEffect</code>는 컴포넌트의 사이드 이펙트(부수 효과)를 처리하는 Hook입니다.
        </p>
        <p>
          데이터 페칭, 구독 설정, DOM 직접 조작, 타이머 설정 등의 작업에 사용됩니다.
        </p>
      </section>

      <section className="demo">
        <h2>예제</h2>

        <div className="example">
          <h3>1. 문서 타이틀 업데이트</h3>
          <p>현재 카운트: {count}</p>
          <p className="hint">(브라우저 탭의 제목이 변경됩니다)</p>
          <button onClick={() => setCount(count + 1)}>증가</button>
        </div>

        <div className="example">
          <h3>2. 타이머</h3>
          <p>경과 시간: {seconds}초</p>
          <p className="hint">(컴포넌트가 마운트된 후 매초 증가)</p>
        </div>

        <div className="example">
          <h3>3. 데이터 페칭</h3>
          <button onClick={fetchData} disabled={isLoading}>
            데이터 가져오기
          </button>
          {isLoading && <p>로딩 중...</p>}
          {data && <p>{data}</p>}
        </div>
      </section>

      <section className="code-explanation">
        <h2>코드 설명</h2>
        <pre>{`import { useEffect, useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // 의존성 배열에 count를 포함
  // count가 변경될 때마다 실행
  useEffect(() => {
    document.title = \`카운트: \${count}\`;
  }, [count]);

  // 빈 의존성 배열
  // 컴포넌트 마운트시 한 번만 실행
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('1초마다 실행');
    }, 1000);

    // 클린업 함수 (컴포넌트 언마운트시 실행)
    return () => clearInterval(timer);
  }, []);

  return <div>...</div>;
}`}</pre>

        <h3>주요 포인트</h3>
        <ul>
          <li><code>useEffect(함수, 의존성배열)</code> 형태로 사용합니다</li>
          <li>의존성 배열이 없으면 매 렌더링마다 실행됩니다</li>
          <li>빈 배열 <code>[]</code>을 전달하면 마운트시 한 번만 실행됩니다</li>
          <li>의존성 배열에 값을 넣으면 그 값이 변경될 때마다 실행됩니다</li>
          <li>클린업 함수를 반환하여 구독 해제, 타이머 정리 등을 수행할 수 있습니다</li>
          <li>React 18+에서는 Strict Mode에서 개발 환경에서 두 번 실행될 수 있습니다</li>
        </ul>
      </section>
    </div>
  );
}
