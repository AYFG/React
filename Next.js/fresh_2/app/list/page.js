export default function List() {
  let 상품 = ["Tomatoes", "Pasta", "Coconut"];
  let 가격 = [20, 30, 40];
  let link = "/list/def";
  return (
    <div>
      <h4 className="title">상품목록</h4>
      {상품.map((a, i) => {
        return (
          <div className="food" key={i}>
            <a href={link}>
              <img src={`/food${i}.png`} className="food-img" />
              <h4>
                {a} ${가격[i]}
              </h4>
            </a>
          </div>
        );
      })}
    </div>
  );
}
