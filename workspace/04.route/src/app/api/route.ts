
// GET http://localhost:3000/api
// export async function GET(request: Request){
//     return Response.json({hello : "world"});
// }

import { NextRequest } from "next/server";

// 외부 API 호출
// export async function GET(request: Request){
//     const res = await fetch(
//       `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?ServiceKey=wuW9xR1SRT8ETx%2BJEfP%2BCBTSTJTuRG%2FDMDRoqgYVzVT%2FlxBMvOM4TcOqO%2FYbLKbZVl2ZLK34V8jY0D4RW7fuTw%3D%3D&pageNo=1&numOfRows=10&dataType=JSON&base_date=20240724&base_time=0600&nx=55&ny=127`
//     );
//     const data = await res.json();
//     return Response.json({data});
// }

// GET 함수 호출 자체를 캐시
// 리액트 쿼리의 스태일타임과 다를까?? 넥스트의 리밸리데이트는 서버에 저장되는 캐시
// 리액트 쿼리는 브라우저(클라이언트)에 캐시
// if 리액트 쿼리의 데이터가 프레쉬하다면 넥스트에서는 서버 요청을 하지 않아도 되니 두가지 동시에 사용하면 좋다

// export const dynamic = "force-dynamic" //캐시안함
// export async function GET(request: Request){
//     console.log("get posts")
//     // const res = await fetch(
//     //   `http://172.31.98.210/posts?type=info`
//     // ,{
//         //     next: {
//     //         revalidate: 10,
//     //     }
//     // })
//     const res = await fetch(
//       `http://172.31.98.210/posts?type=info`
//     )
//     const data = await res.json();
//     return Response.json({data});
// }

// export async function GET(request: Request){
export async function GET(request: NextRequest){
  //Next에서 추가한 속성 NextRequest 추가적인 여러 속성 사용 가능
  console.log("get posts", request.geo);
  console.log("get posts", request.ip,request.cookies,request.nextUrl.searchParams);
  const res = await fetch(`http://172.31.98.210/posts?type=info`);
  const data = await res.json();
  return Response.json({ data });
}