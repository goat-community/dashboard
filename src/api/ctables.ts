import type { AxiosError } from "axios";
import type { RequestResult, CTable } from "@types";
import { instance, listQueryGenerator } from "@utils";
import { DeleteManyParams } from "react-admin";

export function getCTables(): RequestResult<CTable[]> {
  return instance
    .get(`/customizations/base`)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function getCTable(layer_name: string): RequestResult<CTable> {
  return instance
    .get(`/customizations/base/${layer_name}`)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function updateCTable(
  table_id: string,
  data: CTable
): RequestResult<CTable> {
  return instance
    .put(`/customizations/base/${table_id}`, data)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function createCTable(data: CTable): RequestResult<CTable> {
  return instance
    .post(`/customizations/base`, data)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function deleteCTable(table_id: string): RequestResult<CTable> {
  return instance
    .delete(`/customizations/base/${table_id}`)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}
