import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { notify, resetNotify } from "./notifier";

/** Reducer */
const initialState = {
  loading: false
} as {
  loading: boolean;
};

export const network = createSlice({
  name: "network",
  initialState,
  reducers: {
    setNetworkState: (
      state: typeof initialState,
      action: PayloadAction<typeof initialState>
    ) => {
      state.loading = action.payload.loading;
    },
    resetNetworkState: (state: typeof initialState) => {
      state.loading = false;
    }
  }
});

export const { setNetworkState, resetNetworkState } = network.actions;
export default network.reducer;

/** Actions  */
//  This HOF will handle network state changes
const ERROR_DISAPPEAR_TIME = 3000;
export function networkStateHandler(req: Function) {
  return async (dispatch: CallableFunction) => {
    dispatch(setNetworkState({ loading: true }));
    try {
      await req();
      dispatch(resetNetworkState());
    } catch (error: any) {
      let error_message = error;
      if (error.response) {
        error_message = error.response?.data?.detail;
      } else if (error.request) {
        // The request was made but no response was received
        error_message = error.request;
      }

      dispatch(
        setNetworkState({
          loading: false
        })
      );
      // notify error message
      dispatch(
        notify({
          msg: error_message || error,
          type: "error"
        })
      );

      setTimeout(() => {
        // reset the error state
        dispatch(resetNotify());
      }, ERROR_DISAPPEAR_TIME);
    }
  };
}
