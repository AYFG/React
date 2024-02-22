import Link from "next/link";

export default function Home() {
  let name = "woong";
  let link = "/list";

  return (
    <div>
      <div></div>
      <h4 className="title" style={{ color: "red", fontSize: "30px" }}>
        쥬시후레시
      </h4>
      <p className="title-sub">by {name}</p>
      <a href={link}>링크</a>
    </div>
  );
}
