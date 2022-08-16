import type {
  CreateResult,
  DeleteResult,
  GetListParams,
  GetListResult,
  GetOneResult,
  UpdateResult
} from "react-admin";
import * as Api from "@api/geostores";
import { pagination, search } from "@utils";
import { GeoStore } from "@types";
import { networkStateHandler } from "./network";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/** Reducer */
const initialState = {
  geostores: [] as GeoStore[]
};

export const geostores = createSlice({
  name: "geostores",
  initialState,
  reducers: {
    setGeoStores: (
      state: typeof initialState,
      action: PayloadAction<GeoStore[]>
    ) => {
      state.geostores = action.payload;
    }
  }
});

export const { setGeoStores } = geostores.actions;
export default geostores.reducer;

export function getGeoStores() {
  return (dispatch: CallableFunction) =>
    dispatch(
      networkStateHandler(async () => {
        const response = await Api.getGeoStores();
        if (response) {
          dispatch(setGeoStores(response));
        }
      })
    );
}

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

          resolve({
            data: filtered_data,
            total: geostores?.length
          });
        })
        .catch((e) => reject(e));
    }),

  /** Get a GeoStore item */
  getGeoStore: (geostore_id: number): Promise<GetOneResult> =>
    new Promise((resolve, reject) => {
      Api.getGeoStore(geostore_id)!
        .then((geostore) => {
          resolve({
            data: geostore
          });
        })
        .catch((e) => reject(e));
    }),

  /** Update a GeoStore */
  updateGeoStore: (
    geostore_id: number,
    data: GeoStore
  ): Promise<UpdateResult> =>
    new Promise((resolve, reject) => {
      Api.updateGeoStore(geostore_id, data)!
        .then((geostore) => {
          resolve({
            data: geostore
          });
        })
        .catch((e) => reject(e));
    }),

  /** Create a GeoStore */
  createGeoStore: (data: GeoStore): Promise<CreateResult> =>
    new Promise((resolve, reject) => {
      Api.createGeoStore(data)!
        .then((geostore) => {
          resolve({
            data: geostore
          });
        })
        .catch((e) => reject(e));
    }),

  /** Delete a GeoStore */
  deleteGeoStore: (geostore_id: number): Promise<DeleteResult> =>
    new Promise((resolve, reject) => {
      Api.deleteGeoStore(geostore_id)!
        .then((geostore) => {
          resolve({
            data: geostore
          });
        })
        .catch((e) => reject(e));
    })
};
