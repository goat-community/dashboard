import type {
  CreateResult,
  DeleteResult,
  GetListParams,
  GetListResult,
  GetOneResult,
  UpdateResult
} from "react-admin";
import type { LayerStyle } from "@types";
import * as Api from "@api/layers";
import { pagination, search } from "@utils";

/** Actions  */
export const LayerProvider = {
  /** Get Layers List */
  getLayersStyleList: (params: GetListParams): Promise<GetListResult> =>
    new Promise((resolve, reject) => {
      Api.getLayersStyle()!
        .then((layersStyle) => {
          let filtered_data;
          // handle pagination
          filtered_data = pagination({
            data: [...layersStyle],
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
          layersStyle!.forEach((layer) => {
            layer.id = layer.name;
          });

          resolve({
            data: filtered_data,
            total: layersStyle?.length
          });
        })
        .catch((e) => reject(e));
    }),

  /** Get a layer */
  getLayerStyle: (layer_name: string): Promise<GetOneResult> =>
    new Promise((resolve, reject) => {
      Api.getLayerStyle(layer_name)!
        .then((layerStyle) => {
          // we should replace the id with the layer name to
          // handle the case of data provider
          resolve({
            data: {
              ...layerStyle,
              id: layerStyle.name
            }
          });
        })
        .catch((e) => reject(e));
    }),

  /** Update a layer */
  updateLayerStyle: (
    layer_name: string,
    data: LayerStyle
  ): Promise<UpdateResult> =>
    new Promise((resolve, reject) => {
      Api.updateLayerStyle(layer_name, data)!
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

  /** Create a layer */
  createLayerStyle: (data: LayerStyle): Promise<CreateResult> =>
    new Promise((resolve, reject) => {
      Api.createLayerStyle(data)!
        .then((layerStyle) => {
          // we should replace the id with the layer name to
          // handle the case of data provider
          resolve({
            data: {
              ...layerStyle,
              id: layerStyle.name
            }
          });
        })
        .catch((e) => reject(e));
    }),

  /** Delete a layer */
  deleteLayerStyle: (layer_name: string): Promise<DeleteResult> =>
    new Promise((resolve, reject) => {
      Api.deleteLayerStyle(layer_name)!
        .then((layerStyle) => {
          resolve({
            data: layerStyle
          });
        })
        .catch((e) => reject(e));
    })
};
