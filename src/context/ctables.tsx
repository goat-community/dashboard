import type {
  CreateResult,
  DeleteResult,
  GetListParams,
  GetListResult,
  GetOneResult,
  UpdateResult
} from "react-admin";
import * as Api from "@api/ctables";
import type { CTable } from "@types";
import { pagination, search } from "@utils";

export const CTablesProvider = {
  /** Get tables list */
  getCTablesList: (params: GetListParams): Promise<GetListResult> =>
    new Promise((resolve, reject) => {
      Api.getCTables()!
        .then((ctables) => {
          let filtered_data;
          // handle pagination
          filtered_data = pagination({
            data: [...ctables],
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
          // ctables!.forEach((layer) => {
          //   layer.id = layer.name;
          // });

          resolve({
            data: filtered_data,
            total: ctables?.length
          });
        })
        .catch((e) => reject(e));
    }),

  /** Get a table */
  getCTable: (table_id: string): Promise<GetOneResult> =>
    new Promise((resolve, reject) => {
      Api.getCTable(table_id)!
        .then((table) => {
          // we should replace the id with the layer name to
          // handle the case of data provider
          resolve({
            data: table
          });
        })
        .catch((e) => reject(e));
    }),

  /** Update a table */
  updateCTable: (table_id: string, data: CTable): Promise<UpdateResult> =>
    new Promise((resolve, reject) => {
      Api.updateCTable(table_id, data)!
        .then((table) => {
          resolve({
            data: table
          });
        })
        .catch((e) => reject(e));
    }),

  /** Create a layer */
  createCTable: (data: CTable): Promise<CreateResult> =>
    new Promise((resolve, reject) => {
      Api.createCTable(data)!
        .then((table) => {
          // we should replace the id with the layer name to
          // handle the case of data provider
          resolve({
            data: table
          });
        })
        .catch((e) => reject(e));
    }),

  /** Delete a layer */
  deleteCTable: (table_id: string): Promise<DeleteResult> =>
    new Promise((resolve, reject) => {
      Api.deleteCTable(table_id)!
        .then((table) => {
          resolve({
            data: table
          });
        })
        .catch((e) => reject(e));
    })
};
