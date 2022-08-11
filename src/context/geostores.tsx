import type { GetListParams, GetListResult } from "react-admin";
import * as Api from "@api/geostores";
import { pagination, search } from "@utils";

/** Actions  */
export const GeoStoreProvider = {
  /** Get GeoStores List */
  getGeoStoresList: (params: GetListParams): Promise<GetListResult> =>
    new Promise((resolve, reject) => {
      Api.getGeoStores()!
        .then((geostores) => {
          let filtered_data;
          // handle pagination
          filtered_data = pagination({
            data: [...geostores],
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
          //   // we should replace all ids with the geostores name to
          //   // handle the case of data provider
          //   geostores!.forEach((geostore) => {
          //     geostore.id = layer.name;
          //   });

          resolve({
            data: filtered_data,
            total: geostores?.length
          });
        })
        .catch((e) => reject(e));
    })
};
