import type { AxiosError } from "axios";
import type { RequestResult, Layer } from "@types";
import { instance } from "@utils";

export function getLayers(): RequestResult<Layer[]> {
  return instance
    .get(`/config/layers/library/styles`)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}
