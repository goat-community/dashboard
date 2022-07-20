import type { AxiosError } from "axios";
import type { Organization, RequestResult } from "@types";
import { instance } from "@utils";

export function getOrganizations(): RequestResult<Organization[]> {
  return instance
    .get("/organizations/")
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}
