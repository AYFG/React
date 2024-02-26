// layout과 template의 차이는 layout은 라우트 간에 상태를 유지하고 네비게이션 동안 재렌더링이 되지 않는다. template.tsx는 상태를 유지하지 않고 네비게이션 시 새로운 인스턴스가 마운트 된다.
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
// usePathname은 client 안에서만 사용할 수 있다.
import "./style.css";
import { useState } from "react";
const navLinks = [
  { name: "Register", href: "/register" },
  { name: "Login", href: "/login" },
  { name: "Forgot Password", href: "/forgot-password" },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const [input, setInput] = useState("");
  return (
    <div>
      <div>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
      </div>

      {navLinks.map((link) => {
        const isActive = pathName.startsWith(link.href);
        return (
          <Link
            href={link.href}
            key={link.name}
            className={isActive ? "font-bold mr-4" : "text-blue-500 mr-4"}
          >
            {link.name}
          </Link>
        );
      })}
      {children}
    </div>
  );
}
