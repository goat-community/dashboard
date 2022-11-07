import * as Api from "@api/status";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppStatus } from "@types";
import { networkStateHandler } from "./network";

/** Reducer */
const initialState = {
  status: "running" as AppStatus
};

export const appstatus = createSlice({
  name: "appstatus",
  initialState,
  reducers: {
    setAppStatus: (
      state: typeof initialState,
      action: PayloadAction<AppStatus>
    ) => {
      state.status = action.payload;
    }
  }
});

export const { setAppStatus } = appstatus.actions;
export default appstatus.reducer;

export function getAppStatus() {
  return (dispatch: CallableFunction) => {
    dispatch(
      networkStateHandler(async () => {
        try {
          const response = await Api.getAppStatus();
          if (response) {
            dispatch(setAppStatus("running"));
          }
        } catch (e) {
          dispatch(setAppStatus("maintenance"));
        }
      })
    );
  };
}

export function updateAppStatus(status: AppStatus) {
  return (dispatch: CallableFunction) => {
    dispatch(
      networkStateHandler(async () => {
        await Api.updateAppStatus(status);
        dispatch(getAppStatus());
      })
    );
  };
}
