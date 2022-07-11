import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type NotifierState = "info" | "success" | "warning" | "error";

/** Reducer */
const initialState = {
  msg: "",
  type: "info"
} as {
  msg: string;
  type: NotifierState;
};

export const notifier = createSlice({
  name: "notifier",
  initialState,
  reducers: {
    notify: (
      state: typeof initialState,
      action: PayloadAction<typeof initialState>
    ) => {
      state.msg = action.payload.msg;
      state.type = action.payload.type;
    },
    resetNotify: (state: typeof initialState) => {
      state.msg = initialState.msg;
      state.type = initialState.type;
    }
  }
});

export const { notify, resetNotify } = notifier.actions;
export default notifier.reducer;
