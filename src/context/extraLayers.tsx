import type {
  CreateResult,
  DeleteResult,
  GetListParams,
  GetListResult,
  GetOneResult,
  UpdateResult
} from "react-admin";
import * as Api from "@api/extraLayers";
import { pagination, search } from "@utils";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { networkStateHandler } from "./network";
import { ExtraLayer } from "@types";

/** Reducer */
const initialState = {
  extraLayers: [] as ExtraLayer[]
};

export const extraLayers = createSlice({
  name: "extraLayers",
  initialState,
  reducers: {
    setLayers: (
      state: typeof initialState,
      action: PayloadAction<ExtraLayer[]>
    ) => {
      state.extraLayers = action.payload;
    }
  }
});

export const { setLayers } = extraLayers.actions;
export default extraLayers.reducer;

/** Actions  */

export function getExtraLayers() {
  return (dispatch: CallableFunction) =>
    dispatch(
      networkStateHandler(async () => {
        const response = await Api.getExtraLayers();
        if (response) {
          dispatch(setLayers(response));
        }
      })
    );
}

export const ExtraLayerProvider = {
  /** Get Extra Layers List */
  getExtraLayersList: (params: GetListParams): Promise<GetListResult> =>
    new Promise((resolve, reject) => {
      Api.getExtraLayers()!
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
    }),

  /** Get an Extra Layer */
  getExtraLayer: (layer_id: number): Promise<GetOneResult> =>
    new Promise((resolve, reject) => {
      Api.getExtraLayer(layer_id)!
        .then((layer) => {
          resolve({
            data: layer
          });
        })
        .catch((e) => reject(e));
    }),

  /** Update an Extra Layer */
  updateExtraLayer: (
    layer_id: number,
    data: { upload_file: string }
  ): Promise<UpdateResult> =>
    new Promise((resolve, reject) => {
      Api.updateExtraLayer(layer_id, data)!
        .then((layerStyle) => {
          resolve({
            data: layerStyle
          });
        })
        .catch((e) => reject(e));
    }),

  /** Delete an Extra Layer */
  deleteExtraLayer: (layer_id: number): Promise<DeleteResult> =>
    new Promise((resolve, reject) => {
      Api.deleteExtraLayer(layer_id)!
        .then((result) => {
          resolve({ data: result });
        })
        .catch((e) => reject(e));
    }),

  /** Create an Extra Layer */
  createExtraLayer: (data: { upload_file: string }): Promise<CreateResult> =>
    new Promise((resolve, reject) => {
      Api.createExtraLayer(data)!
        .then((layer) => {
          resolve({
            data: layer
          });
        })
        .catch((e) => reject(e));
    })
};
