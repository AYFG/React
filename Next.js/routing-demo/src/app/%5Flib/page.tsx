export default function PrivateRoute() {
  return <h1>이 페이지는 볼 수 없습니다.</h1>;
  // 폴더명 앞에 _를 붙이면 Private 폴더로 간주된다.
  // 폴더명 앞에 %5F를 붙이면 _lib 주소로 라우트 가능하다.
}
