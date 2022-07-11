import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/** Reducer */
const initialState = {
  loading: false,
  error: null
} as {
  loading: boolean;
  error: string | null;
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
      state.error = action.payload.error;
    },
    resetNetworkState: (state: typeof initialState) => {
      state.loading = false;
      state.error = null;
    }
  }
});

export const { setNetworkState, resetNetworkState } = network.actions;
export default network.reducer;

/** Actions  */
//  This HOF will handle network state changes
const ERROR_DISAPPEAR_TIME = 3000;
export function networkStateHandler(req: Function) {
  // set the loading state to true
  return async (dispatch: CallableFunction) => {
    dispatch(setNetworkState({ loading: true, error: null }));
    // make the request
    try {
      await req();
      dispatch(resetNetworkState());
    } catch (error: any) {
      // set the error state
      let error_message = error;
      // set the error state to the error message
      if (error.response) {
        // Request made and server responded
        error_message = error.response?.data?.detail;
      } else if (error.request) {
        // The request was made but no response was received
        error_message = error.request;
      }

      dispatch(
        setNetworkState({
          loading: false,
          error: error_message || error.message
        })
      );

      setTimeout(() => {
        // reset the error state
        dispatch(resetNetworkState());
      }, ERROR_DISAPPEAR_TIME);
    }
  };
}
