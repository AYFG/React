export default function Page({ params }: { params: {id: string, slug: string, sid: string}}) {
  return (
    <>
      <h1>posts/[id]/replies/[sid]/page.tsx</h1>
      <h2>
        {params.id}번 게시물의 댓글 {params.sid} 조회
      </h2>
    </>
  );
}
