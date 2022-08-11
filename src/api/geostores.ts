import type { AxiosError } from "axios";
import type { RequestResult, GeoStore } from "@types";
import { instance } from "@utils";

export function getGeoStores(): RequestResult<GeoStore[]> {
  return instance
    .get(`/config/geostores`)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}
