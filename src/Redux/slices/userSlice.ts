import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface activeUsersInterface {
  firstName: string;
  lastName: string;
  phoneNumber: number;
  age: number;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface users {
  activeUsers: activeUsersInterface[];
  userIdToBeEdited: string;
}

const initialState: users = {
  activeUsers: [],
  userIdToBeEdited: "",
};

export const userSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    setAllUsers: (state, action: PayloadAction<activeUsersInterface[]>) => {
      state.activeUsers = action.payload;
    },
    setUserIdToBeEdited: (state, action: PayloadAction<string>) => {
      state.userIdToBeEdited = action.payload;
    },
  },
});

export const { setAllUsers, setUserIdToBeEdited } = userSlice.actions;
export default userSlice.reducer;
