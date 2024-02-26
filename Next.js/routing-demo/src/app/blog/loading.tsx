export default function loading() {
  return <div>loading</div>;
}
// loading.tsx의 장점 네비게이션 메뉴나 사이드바와 같은 특정 부분(app의 layout)은 로딩시간 동안 렌더링이 일어나지 않아 계속 상호작용이 가능하다.
