import { createSlice } from "@reduxjs/toolkit";
import { PopupsNameType } from "../../containers/popups-manager";

// slice
const initialState: PopupsStateType = {
  mountedPopups: [],
}

const popupsSlice = createSlice({
  name: "popups",
  initialState,
  reducers: {
    open(state, action) {
      state.mountedPopups.push(action.payload)
    },
    close(state, action) {
      state.mountedPopups = state.mountedPopups.filter(popup => popup === action.payload)
    },
    closeAll(state) {
      state.mountedPopups = []
    },
  },
  extraReducers: (builder) => {
  },
});

export const popupsActions = popupsSlice.actions
export default popupsSlice.reducer;

// types
type PopupsStateType = {
  mountedPopups: CommonPopupType[]
}

type RequiredPopupType = {
  name: PopupsNameType;
  onClose: () => void;
};

type OptionalPopupType = {
  [key: string]: any;
};

export type CommonPopupType = RequiredPopupType & OptionalPopupType;