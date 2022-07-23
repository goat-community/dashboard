import type { GetListParams, GetListResult } from "react-admin";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Layer } from "@types";
import * as Api from "@api/layers";
import { pagination, search } from "@utils";

/** Reducer */
const initialState = {
  layers: [] as Layer[]
};

export const layer = createSlice({
  name: "layer",
  initialState,
  reducers: {
    setLayers: (state: typeof initialState, action: PayloadAction<Layer[]>) => {
      state.layers = action.payload;
    }
  }
});

export const { setLayers } = layer.actions;
export default layer.reducer;

/** Actions  */
export const LayerProvider = {
  /** Get Layers List */
  getLayersList: (params: GetListParams): Promise<GetListResult> =>
    new Promise((resolve, reject) => {
      Api.getLayers()!
        .then((layers) => {
          let filtered_data;
          // handle pagination
          filtered_data = pagination({
            data: [...layers],
            page: params.pagination.page,
            perPage: params.pagination.perPage
          });
          // handle search
          if (params.filter.q) {
            filtered_data = search({
              data: filtered_data,
              q: params.filter.q
            });
          }

          resolve({
            data: filtered_data,
            total: layers?.length
          });
        })
        .catch((e) => reject(e));
    })
};
