// let data = {
//   name: "웅이네 식당",
//   category: "western",
//   address: {
//     city: "seoul",
//     detail: "somewhere",
//     zipCode: 2342323,
//   },
//   menu: [{ name: "ramen", price: 2000, category: "noodle" }],
// };

export type Restaurant = {
  name: string;
  category: string;
  address: Address;
  menu: Menu[];
};

export type Address = {
  city: string;
  detail: string;
  //   ? = Number | undefined
  zipCode?: number;
};

export type Menu = {
  name: string;
  price: number;
  category: string;
};

// Omit = 빼버림
export type AddressWithoutZip = Omit<Address, "zipCode">;
// Pick = 가져옴
export type RestaurantOnlyCategory = Pick<Restaurant, "category">;

// API 데이터 타입 지정
export type ApiResponse<T> = {
  data: T[];
  totalPage: number;
  page: number;
};
export type ResturantResponse = ApiResponse<Restaurant>;
export type MenuResponse = ApiResponse<Menu>;
