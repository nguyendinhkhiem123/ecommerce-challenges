import { OPEN_DRAWER } from "@/common/constants/drawer";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IConfigState {
  isOpenDrawer: boolean;
}

const initialState: IConfigState = {
  isOpenDrawer: JSON.parse(window.localStorage.getItem(OPEN_DRAWER) || "true"),
};

export const configSlice = createSlice({
  name: "_config",
  initialState,
  reducers: {
    toggleOpenDrawer: (state) => {
      state.isOpenDrawer = !state.isOpenDrawer;
    },
    setOpenDrawer: (state, action: PayloadAction<boolean>) => {
      state.isOpenDrawer = action.payload;
    },
  },
});

// Actions
export const { toggleOpenDrawer, setOpenDrawer } = configSlice.actions;

export default configSlice.reducer;
