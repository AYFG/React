function getRandomInt(count: number) {
  return Math.floor(Math.random() * count);
}

export default function ProductDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const random = getRandomInt(2);
  if (random === 1) {
    throw new Error("product layout에서 에러 핸들링 학습중");
    // 이 에러를 error.tsx로 잡아내려면 동일한 세그먼트 내에서는 잡아내지 못하고 부모 세그먼트에 error.tsx를 배치해야 한다.
  }
  return (
    <>
      {children}
      <h2>Features products</h2>
    </>
  );
}
