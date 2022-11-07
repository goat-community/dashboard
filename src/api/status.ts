import axios from "axios";
import type { AxiosError } from "axios";
import { AppStatus, ErrorResponse, RequestResult } from "@types";
import { baseUrl, instance } from "@utils";

export function getAppStatus(): RequestResult<AppStatus> {
  return axios
    .get(baseUrl({ removeV1: true }) + "/status")
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function updateAppStatus(
  status: AppStatus
): RequestResult<AppStatus | ErrorResponse> {
  return instance
    .put("/status", {
      status: status
    })
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}
