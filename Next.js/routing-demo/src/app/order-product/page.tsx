"use client";
import { useRouter } from "next/navigation";
// useRouter는 클라이언트 안에서만 사용할 수 있다.
export default function OrderProduct() {
  const router = useRouter();

  const handleClick = () => {
    console.log("Placing your order");
    // router.push("/"); //새로운 페이지 이동 (브라우저 히스토리에 새로운 항목 추가)
    // router.replace("/"); //현재 페이지를 새로운 페이지로 대체(브라우저 히스토리에 현재 페이지를 대체)
    // router.back(); //브라우저 히스토리에서 한 단계 뒤로
    router.forward(); // 브라우저 히스토리에서 한 단계 앞으로
  };
  return (
    <>
      <h1>Order product</h1>
      <button onClick={handleClick}>placeOrder</button>
    </>
  );
}
