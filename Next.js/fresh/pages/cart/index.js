import Link from "next/link";

export default function Cart() {
  return (
    <di>
      <h4>장바구니입니다.</h4>
      <Link href="/cart/payment">결제</Link>
    </di>
  );
}
