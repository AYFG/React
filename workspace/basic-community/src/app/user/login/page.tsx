import Link from "next/link";
{/* <title>로그인 - 멋사컴</title>

    <meta name="description" content="다양한 주제의 커뮤니티와 활발한 소통을 위한 플랫폼입니다. 관심사에 따라 참여하고, 의견을 나누세요." />
    <meta name="keywords" content="커뮤니티, 소통, 포럼, 관심사, 온라인 모임, 커뮤니티 서비스" />
    <meta name="author" content="FESP 2기" />

    <meta property="og:title" content="로그인" />
    <meta property="og:description" content="로그인 페이지." />
    <meta property="og:image" content="/images/fesp.webp" />
    <meta property="og:url" content="https://community.fesp.shop/user/login" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="멋사컴" /> */}
import { Metadata } from "next";

    export const metadata: Metadata = {
        title: "로그인 - 멋사컴",
        openGraph: {
          title: "로그인",
          description: "로그인 페이지",
          url: `https://community.fesp.shop/user/login`,
        },
      };
export default function Page() {
  return (
    <main className="min-w-80 flex-grow flex items-center justify-center">
          <div className="p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
            <div className="text-center py-4">
              <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">로그인</h2>
            </div>
    
            <form method="post" action="/">
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="email">이메일</label>
                <input
                  id="email"
                  type="email"
                  placeholder="이메일을 입력하세요"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
                  name="email"
                />
                <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">이메일은 필수입니다.</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="password">비밀번호</label>
                <input
                  id="password"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
                  name="password"
                />
                <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">비밀번호는 필수입니다.</p>
                <Link href="#" className="block mt-6 ml-auto text-gray-500 text-sm dark:text-gray-300 hover:underline">비밀번호를 잊으셨나요?</Link>
              </div>
              <div className="mt-10 flex justify-center items-center">
                <button type="submit" className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">로그인</button>
                <Link href="/user/signup" className="ml-8 text-gray-800 hover:underline">회원가입</Link>
              </div>
            </form>
          </div>
        </main>
  )
}
