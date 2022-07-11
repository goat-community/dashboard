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
    setNotify: (
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

export const { setNotify, resetNotify } = notifier.actions;
export default notifier.reducer;

/** Actions  */
//  This HOF will handle network state changes
const NOTIFY_DISAPPEAR_TIME = 4000;
export function notify(msg: string, type: NotifierState) {
  return (dispatch: CallableFunction) => {
    dispatch(setNotify({ msg, type }));

    setTimeout(() => {
      // reset the notify state
      dispatch(resetNotify());
    }, NOTIFY_DISAPPEAR_TIME);
  };
}
