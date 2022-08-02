import type { GetListParams, GetListResult } from "react-admin";
import * as Api from "@api/layers";
import { pagination, search } from "@utils";

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
    })
};
