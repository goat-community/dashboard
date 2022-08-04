import type {
  CreateResult,
  GetListParams,
  GetListResult,
  GetOneResult,
  UpdateResult
} from "react-admin";
import * as Api from "@api/layers";
import { pagination, search } from "@utils";
import { Layer } from "@types";

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
    })
};
