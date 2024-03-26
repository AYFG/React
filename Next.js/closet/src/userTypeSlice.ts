import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface userTypeState {
  value: string;
}

const initialState: userTypeState = {
  value: "SELLER",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserType: (state: userTypeState, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setUserType } = userSlice.actions;
export default userSlice.reducer;
