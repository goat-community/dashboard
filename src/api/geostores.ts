import type { AxiosError } from "axios";
import type { RequestResult, GeoStore } from "@types";
import { instance, listQueryGenerator } from "@utils";
import { DeleteManyParams } from "react-admin";

export function getGeoStores(): RequestResult<GeoStore[]> {
  return instance
    .get(`/config/geostores`)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function getGeoStore(geostore_id: number): RequestResult<GeoStore> {
  return instance
    .get(`/config/geostores/${geostore_id}`)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function updateGeoStore(
  geostore_id: number,
  data: GeoStore
): RequestResult<GeoStore> {
  delete data.id;
  return instance
    .put(`/config/geostores/${geostore_id}`, data)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function createGeoStore(data: GeoStore): RequestResult<GeoStore> {
  return instance
    .post(`/config/geostores`, data)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function deleteGeoStore(geostore_id: number): RequestResult<string> {
  return instance
    .delete(`/config/geostores/?id=${geostore_id}`)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function deleteGeoStores(
  params: DeleteManyParams
): RequestResult<string> {
  return instance
    .delete(`/config/geostores/${listQueryGenerator(params.ids)}`)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}
