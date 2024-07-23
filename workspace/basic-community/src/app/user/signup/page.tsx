import Link from "next/link";
import { Metadata } from "next";
//  <title>회원 가입 - 멋사컴</title>

//     <meta name="description" content="다양한 주제의 커뮤니티와 활발한 소통을 위한 플랫폼입니다. 관심사에 따라 참여하고, 의견을 나누세요." />
//     <meta name="keywords" content="커뮤니티, 소통, 포럼, 관심사, 온라인 모임, 커뮤니티 서비스" />
//     <meta name="author" content="FESP 2기" />

//     <meta property="og:title" content="회원 가입" />
//     <meta property="og:description" content="무료 회원 가입후 멋사컴의 모든 서비스를 이용하세요." />
//     <meta property="og:image" content="/images/fesp.webp" />
//     <meta property="og:url" content="https://community.fesp.shop/user/signup" />
//     <meta property="og:type" content="article" />
//     <meta property="og:site_name" content="멋사컴" />
export const metadata: Metadata = {
    title: "회원가입 - 멋사컴",
    openGraph: {
      title: "회원 가입",
      description: "무료 회원 가입후 멋사컴의 모든 서비스를 이용하세요.",
      url: `https://community.fesp.shop/user/signup`,
    },
  };
export default function Page() {
  return (
    <main className="min-w-80 flex-grow flex items-center justify-center">
          <div className="p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
            <div className="text-center py-4">
              <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">회원 가입</h2>
            </div>
    
            <form method="post" action="/">
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="name">이름</label>
                <input
                  type="text"
                  id="name"
                  placeholder="이름을 입력하세요"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
                  name="name"
                />
                <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">이름은 필수입니다.</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="email">이메일</label>
                <input
                  type="email"
                  id="email"
                  placeholder="이메일을 입력하세요"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
                  name="email"
                />
                <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">이메일은 필수입니다.</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="password">비밀번호</label>
                <input
                  type="password"
                  id="password"
                  placeholder="비밀번호를 입력하세요"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
                  name="password"
                />
                <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">비밀번호는 필수입니다.</p>
              </div>
    
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="attach">프로필 이미지</label>
                <input
                  type="file"
                  id="attach"
                  accept="image/*"
                  placeholder="이미지를 선택하세요"
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
                  name="attach"
                />
              </div>
    
              <div className="mt-10 flex justify-center items-center">
                <button type="submit" className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">회원가입</button>
                <Link href="/" className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">취소</Link>
              </div>
            </form>
          </div>
        </main>
  )
}