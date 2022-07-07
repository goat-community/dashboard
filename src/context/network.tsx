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
export function networkStateHandler(req: CallableFunction) {
  // set the loading state to true
  return async (dispatch: CallableFunction) => {
    dispatch(setNetworkState({ loading: true, error: null }));
    // make the request
    try {
      await req();
      dispatch(resetNetworkState());
    } catch (err: any) {
      // set the error state to the error message
      dispatch(setNetworkState({ loading: false, error: err }));
      setTimeout(() => {
        // reset the error state
        dispatch(resetNetworkState());
      }, ERROR_DISAPPEAR_TIME);
    }
  };
}
