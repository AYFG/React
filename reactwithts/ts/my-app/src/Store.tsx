import React from "react";
import { Address, Restaurant } from "./model/restaurant";

interface OwnProps {
  info: Restaurant;
  changeAddress(address: Address): void;
}

export const Store: React.FC<OwnProps> = ({ info }) => {
  return <div>{info.name}</div>;
};
