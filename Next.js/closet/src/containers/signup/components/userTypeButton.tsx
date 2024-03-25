"use client";

import type { RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { setUserType } from "@/userTypeSlice";

interface UserTypeButtonProps {
  sellerButtonText: string;
  buyerButtonText: string;
}

export default function UserTypeButton({
  sellerButtonText,
  buyerButtonText,
}: UserTypeButtonProps) {
  const userType = useSelector((state: RootState) => state.userType.userType);
  const dispatch = useDispatch();
  const SellerBtn = () => {
    if (userType === "SELLER") {
      return "bg-blue-500 text-white";
    } else {
      return "bg-white shadow-lg rounded-lg";
    }
  };
  const BuyerBtn = () => {
    if (userType === "BUYER") {
      return "bg-blue-500 text-white";
    } else {
      return "bg-white shadow-lg rounded-lg";
    }
  };
  return (
    <div className="flex">
      <button
        id="SELLER"
        onClick={() => dispatch(setUserType("SELLER"))}
        className={`${SellerBtn()}border m-6 px-6 py-2 rounded-lg `}
      >
        {sellerButtonText}
      </button>
      <button
        id="BUYER"
        onClick={() => dispatch(setUserType("BUYER"))}
        className={`${BuyerBtn()}border m-6 px-6 py-2 rounded-lg `}
      >
        {buyerButtonText}
      </button>
    </div>
  );
}
