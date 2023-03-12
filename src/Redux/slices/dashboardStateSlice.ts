import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface dashboardStateSliceInterface {
  openModal: boolean;
  loading: boolean;
  openToast: boolean;
  toastMessage: string;
  openDeleteUserModal: boolean;
  activeTab: number;
  deleteApiVariableId: string;
}

const initialState: dashboardStateSliceInterface = {
  openModal: false,
  openDeleteUserModal: false,
  loading: false,
  openToast: false,
  toastMessage: "",
  activeTab: 0,
  deleteApiVariableId: "",
};
export const dashboardStateSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpenModal: (state, action: PayloadAction<boolean>) => {
      state.openModal = action.payload;
    },
    setOpenDeleteUserModal: (state, action: PayloadAction<boolean>) => {
      state.openDeleteUserModal = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setOpenToast: (state, action: PayloadAction<boolean>) => {
      state.openToast = action.payload;
    },
    setToastMessage: (state, action: PayloadAction<string>) => {
      state.toastMessage = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<number>) => {
      state.activeTab = action.payload;
    },
    setSeleteApiVariableId: (state, action: PayloadAction<string>) => {
      state.deleteApiVariableId = action.payload;
    },
  },
});

export const {
  setOpenModal,
  setLoading,
  setOpenToast,
  setToastMessage,
  setOpenDeleteUserModal,
  setActiveTab,
  setSeleteApiVariableId,
} = dashboardStateSlice.actions;
export default dashboardStateSlice.reducer;
