"use client";
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      {error.message}
      <button onClick={reset}>다시 시도</button>
    </div>
  );
}
// reviews의 layout.tsx의 오류를 잡아내려고 부모 세그먼트에 error.tsx를 배치했다.동일한 세그먼트로 이 error.tsx를 옮기면 에러를 잡아내지 못하는 것을 볼 수 있다.
