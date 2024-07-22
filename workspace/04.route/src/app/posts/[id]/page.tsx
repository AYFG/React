// export const metadata: Metadata = {
//     title: `3번 게이지`,
//     description: `3번 게시물 상세정보`,
// };

import { Metadata } from "next";

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
    return {
      title: `${params.id}번 게시물`,
      description: `${params.id}번 게시물 상세정보`,
      openGraph: {
        title: `${params.id}번 게시물`,
        description: `${params.id}번 게시물 상세정보`,
        images: {
            url: `/images/fesp.webp`
        },
        url: `https://community,fesp.shop/info/${params.id}`,
      },
    };
}

export default function Page({ params }: { params: { id: string } }) {
    return <h1 className="text-xl font-bold mb-4">{params.id} 상세 조회 </h1>;
}
