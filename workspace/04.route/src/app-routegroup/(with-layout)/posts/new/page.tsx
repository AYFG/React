"use client"

import { redirect, useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const isLogin = false;
    if(!isLogin){
        redirect("/login");
    }
    return (
      <>
        <h1 className="text-xl font-bold mb-4">글쓰기</h1>
        <button onClick ={ () => router.push("/login")}>로그인</button>
        {/** redirect는 클라이언트 컴포넌트에서 렌더링 중에는 사용 가능하지만 이벤트 핸들러에서는 사용 불가 */}
        {/* <button onClick={() => redirect("/login")}>로그인</button> */}
      </>
    );
}