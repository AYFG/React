"use client";

import UserTypeButton from "./components/userTypeButton";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Seller from "./components/seller";
import Buyer from "./components/buyer";
import { UserData } from "./components/type";
import { useState } from "react";
export default function signUp() {
  const [userData, setUserData] = useState<UserData>({
    user: {
      username: "",
      password: "",
      password2: "",
      phone_number: "",
      name: "",
      company_registration_number: "",
      store_name: "",
    },
  });

  const userType = useSelector((state: RootState) => state.userType.value);
  const BASE_URL = "https://openmarket.weniv.co.kr/";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userType === "SELLER") {
    }
    if (userType === "BUYER") {
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col p-4 max-w-sm mx-auto mt-10 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-center text-xl mb-6">회원가입</h2>
      <UserTypeButton sellerButtonText="구매회원" buyerButtonText="판매회원" />
      {userType === "SELLER" && (
        <Seller userData={userData.user} setUserData={setUserData} />
      )}
      {userType === "BUYER" && (
        <Buyer userData={userData.user} setUserData={setUserData} />
      )}
    </form>
  );
}
