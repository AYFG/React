import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface userTypeState {
  userType: string;
}

const initialState: userTypeState = {
  userType: "SELLER",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserType: (state: userTypeState, action: PayloadAction<string>) => {
      state.userType = action.payload;
      console.log(state);
    },
  },
});

export const { setUserType } = userSlice.actions;
export default userSlice.reducer;
