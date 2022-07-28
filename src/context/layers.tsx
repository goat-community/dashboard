import type {
  CreateResult,
  DeleteResult,
  GetListParams,
  GetListResult,
  GetOneResult,
  UpdateResult
} from "react-admin";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Layer, LayerStyle } from "@types";
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
          // we should replace all ids with the layer name to
          // handle the case of data provider
          layers!.forEach((layer) => {
            layer.id = layer.name;
          });

          resolve({
            data: filtered_data,
            total: layers?.length
          });
        })
        .catch((e) => reject(e));
    }),

  /** Get a layer */
  getLayer: (layer_name: string): Promise<GetOneResult> =>
    new Promise((resolve, reject) => {
      Api.getLayer(layer_name)!
        .then((layer) => {
          // we should replace the id with the layer name to
          // handle the case of data provider
          resolve({
            data: {
              ...layer,
              id: layer.name
            }
          });
        })
        .catch((e) => reject(e));
    }),

  /** Update a layer */
  updateLayer: (layer_name: string, data: LayerStyle): Promise<UpdateResult> =>
    new Promise((resolve, reject) => {
      Api.updateLayer(layer_name, data)!
        .then(() => {
          resolve({
            data: true
          });
        })
        .catch((e) => reject(e));
    }),

  /** Create a layer */
  createLayer: (data: LayerStyle): Promise<CreateResult> =>
    new Promise((resolve, reject) => {
      Api.createLayer(data)!
        .then((layer) => {
          // we should replace the id with the layer name to
          // handle the case of data provider
          resolve({
            data: {
              ...layer,
              id: layer.name
            }
          });
        })
        .catch((e) => reject(e));
    }),

  /** Delete a layer */
  deleteLayer: (layer_name: string): Promise<DeleteResult> =>
    new Promise((resolve, reject) => {
      Api.deleteLayer(layer_name)!
        .then((layer) => {
          resolve({
            data: layer
          });
        })
        .catch((e) => reject(e));
    })
};
