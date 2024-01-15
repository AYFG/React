import logo from "./logo.svg";
import "./App.css";
import { Store } from "./Store";
import { Address, Restaurant } from "./model/restaurant";
import { useState } from "react";
import { BestMenu } from "./BestMenu";

let data: Restaurant = {
  name: "웅이네 식당",
  category: "western",
  address: {
    city: "seoul",
    detail: "somewhere",
    zipCode: 2342323,
  },
  menu: [
    { name: "ramen", price: 2000, category: "noodle" },
    {
      name: "steak",
      price: 3000,
      category: "meat",
    },
  ],
};

const App: React.FC = () => {
  const [myRestaurant, setMyRestaurant] = useState<Restaurant>(data);
  const changeAddress = (address: Address) => {
    setMyRestaurant({ ...myRestaurant, address: address });
  };
  const showBestMenuName = (name: string) => {
    return name;
  };
  return (
    <div className="App">
      <Store info={myRestaurant} changeAddress={changeAddress} />
      <BestMenu
        name="불고기피자"
        category="pizza"
        showBestMenuName={showBestMenuName}
      />
    </div>
  );
};

export default App;
