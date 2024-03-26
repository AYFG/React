import { Dispatch, SetStateAction } from "react";
import { UserData } from "./type";

const updateUserData = (
  e: React.ChangeEvent<HTMLInputElement>,
  setUserData: Dispatch<SetStateAction<UserData>>
) => {
  setUserData((prevUserData: UserData) => {
    return {
      ...prevUserData,
      user: {
        ...prevUserData.user,
        [e.target.id]: e.target.value,
      },
    };
  });
};
export { updateUserData };
