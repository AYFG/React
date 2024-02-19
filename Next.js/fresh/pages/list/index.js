export default function List() {
  let link = "/list/def";
  return (
    <div>
      <h4 className="title">상품목록</h4>
      <div className="food">
        <h4>상품1 $40</h4>
      </div>
      <div className="food">
        <h4>상품2 $40</h4>
        <a href={link}>링크</a>
      </div>
    </div>
  );
}
