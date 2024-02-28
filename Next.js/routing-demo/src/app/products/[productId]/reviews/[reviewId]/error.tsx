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
// error.tsx의 장점 : 에러가 생긴 컴포넌트만 격리되고 나머지는 기능이 된다.전체 페이지를 다시 로드하지 않고 오류에서 복구를 시도하는 기능을 추가할 수 있다.
// error.tsx의 오류 복구 방법 : page.tsx가 클라이언트 컴포넌트이어야 하고,reset 매개변수를 이용해 오류 상태 벗어나기
