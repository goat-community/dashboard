import type { GetListParams, GetListResult, UpdateResult } from "react-admin";
import * as Api from "@api/studyareas";
import { pagination, search } from "@utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { networkStateHandler } from "./network";
import { GeoStore } from "@types";

/** Reducer */
const initialState = {
  layerStudyAreasConfig: [] as string[],
  geoStoresConfig: [] as GeoStore[]
};

export const studyareas = createSlice({
  name: "studyareas",
  initialState,
  reducers: {
    setLayerStudyAreasConfig: (
      state: typeof initialState,
      action: PayloadAction<string[]>
    ) => {
      state.layerStudyAreasConfig = action.payload;
    },
    setGeoStoresConfig: (
      state: typeof initialState,
      action: PayloadAction<GeoStore[]>
    ) => {
      state.geoStoresConfig = action.payload;
    }
  }
});

export const { setLayerStudyAreasConfig, setGeoStoresConfig } =
  studyareas.actions;
export default studyareas.reducer;

export function getLayerStudyAreasConfig(
  study_area_id: number,
  group_name: string
) {
  return (dispatch: CallableFunction) => {
    dispatch(setLayerStudyAreasConfig([]));
    dispatch(
      networkStateHandler(async () => {
        const response = await Api.getLayersStudyAreas(
          study_area_id,
          group_name
        );
        if (response) {
          dispatch(setLayerStudyAreasConfig(response));
        }
      })
    );
  };
}

export function getGeoStoresConfig(study_area_id: number) {
  return (dispatch: CallableFunction) => {
    dispatch(setLayerStudyAreasConfig([]));
    dispatch(
      networkStateHandler(async () => {
        const response = await Api.getGeoStoresConfig(study_area_id);
        if (response) {
          dispatch(setGeoStoresConfig(response));
        }
      })
    );
  };
}

export function deleteGeoStoresConfig(
  study_area_id: number,
  geostore_id: number
) {
  return (dispatch: CallableFunction) => {
    dispatch(
      networkStateHandler(async () => {
        const response = await Api.deleteGeoStoresConfig(
          study_area_id,
          geostore_id
        );
        if (response) {
          dispatch(setGeoStoresConfig(response));
        }
      })
    );
  };
}

export function addGeoStoresConfig(study_area_id: number, geostore_id: number) {
  return (dispatch: CallableFunction) => {
    dispatch(
      networkStateHandler(async () => {
        const response = await Api.addGeoStoresConfig(
          study_area_id,
          geostore_id
        );
        if (response) {
          dispatch(setGeoStoresConfig(response));
        }
      })
    );
  };
}

export const StudyAreaProvider = {
  /** Get StudyAreas List */
  getStudyAreasList: (params: GetListParams): Promise<GetListResult> =>
    new Promise((resolve, reject) => {
      Api.getStudyAreas()!
        .then((studyareas) => {
          let filtered_data;
          // handle pagination
          filtered_data = pagination({
            data: [...studyareas],
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
            total: studyareas?.length
          });
        })
        .catch((e) => reject(e));
    }),

  /** Update a layer study area config */
  updateStudyAreaLayerConfig: (
    id: number,
    data: { group_name: string; layer_configs: string[] }
  ): Promise<UpdateResult> =>
    new Promise((resolve, reject) => {
      Api.updateStudyAreaLayerConfig(id, data.group_name, data.layer_configs)!
        .then((studyArea) => {
          resolve({
            data: {
              id,
              ...studyArea
            }
          });
        })
        .catch((e) => reject(e));
    })
};
