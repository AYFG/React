import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <p>Welcome Home!</p>
      <Link href="/blog">Blog</Link>
      <Link href="/products">Products</Link>
    </>
  );
}
