import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="flex flex-row  justify-between static w-full my-10">
          <Link href="/" className="flex text-2xl ml-10">
            test 로고
          </Link>
          <a className="">about</a>
          <a className="">about</a>
          <a className="">about</a>
          <a className="">about</a>
          <Link href="/login" className="mr-10">
            Login
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
