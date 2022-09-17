import type {
  CreateResult,
  DeleteManyParams,
  DeleteManyResult,
  DeleteResult,
  GetListParams,
  GetListResult,
  GetOneResult,
  UpdateResult
} from "react-admin";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import * as Api from "@api/layers";
import { pagination, search } from "@utils";
import { Layer, LayerTile } from "@types";
import { networkStateHandler } from "./network";

/** Reducer */
const initialState = {
  layerTiles: {} as LayerTile,
  layerGroups: [] as string[],
  layers: [] as Layer[]
};

export const layers = createSlice({
  name: "layers",
  initialState,
  reducers: {
    setLayerTile: (
      state: typeof initialState,
      action: PayloadAction<LayerTile>
    ) => {
      state.layerTiles = action.payload;
    },
    setLayerGroups: (
      state: typeof initialState,
      action: PayloadAction<string[]>
    ) => {
      state.layerGroups = action.payload;
    },
    setLayers: (state: typeof initialState, action: PayloadAction<Layer[]>) => {
      state.layers = action.payload;
    }
  }
});

export const { setLayerTile, setLayerGroups, setLayers } = layers.actions;
export default layers.reducer;

export function getLayerTile(layer_name: string) {
  return (dispatch: CallableFunction) =>
    dispatch(
      networkStateHandler(async () => {
        const response = await Api.getLayerTile(layer_name);
        if (response) {
          dispatch(setLayerTile(response));
        }
      })
    );
}

export function getLayerGroups() {
  return (dispatch: CallableFunction) =>
    dispatch(
      networkStateHandler(async () => {
        const response = await Api.getLayerGroupsEnum();
        if (response) {
          dispatch(setLayerGroups(response));
        }
      })
    );
}

export function getLayers() {
  return (dispatch: CallableFunction) =>
    dispatch(
      networkStateHandler(async () => {
        const response = await Api.getLayers();
        if (response) {
          dispatch(setLayers(response));
        }
      })
    );
}

/** Actions  */
export const LayerProvider = {
  /** Get Layers List */
  getLayersList: (params: GetListParams): Promise<GetListResult> =>
    new Promise((resolve, reject) => {
      Api.getLayers()!
        .then((layer) => {
          let filtered_data;
          // handle pagination
          filtered_data = pagination({
            data: [...layer],
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
          layer!.forEach((layer) => {
            layer.id = layer.name;
          });

          resolve({
            data: filtered_data,
            total: layer?.length
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
  updateLayer: (layer_id: number, data: Layer): Promise<UpdateResult> =>
    new Promise((resolve, reject) => {
      Api.updateLayer(layer_id, data)!
        .then((layerStyle) => {
          resolve({
            data: {
              ...layerStyle,
              id: layerStyle.name
            }
          });
        })
        .catch((e) => reject(e));
    }),

  /** Create a Layer */
  createLayer: (data: Layer): Promise<CreateResult> =>
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
    }),

  /** Delete layers */
  deleteLayers: (params: DeleteManyParams): Promise<DeleteManyResult> =>
    new Promise((resolve, reject) => {
      Api.deleteLayers(params)!
        .then(() => {
          resolve({
            data: []
          });
        })
        .catch((e) => reject(e));
    })
};
