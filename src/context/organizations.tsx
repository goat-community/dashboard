import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Organization } from "@types";
import * as Api from "@api/organizations";
import { networkStateHandler } from "./network";

/** Reducer */
const initialState = {
  organs: []
} as {
  organs: Organization[] | [];
};

export const organization = createSlice({
  name: "organization",
  initialState,
  reducers: {
    setOrganizations: (
      state: typeof initialState,
      action: PayloadAction<typeof initialState>
    ) => {
      state.organs = action.payload.organs;
    }
  }
});

export const { setOrganizations } = organization.actions;
export default organization.reducer;

/** Actions  */

export function getOrganizations() {
  return (dispatch: CallableFunction) =>
    dispatch(
      networkStateHandler(async () => {
        const response = await Api.getOrganizations();
        if (response) {
          dispatch(
            setOrganizations({
              organs: response
            })
          );
        }
      })
    );
}
