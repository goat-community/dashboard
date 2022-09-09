import type { AxiosError } from "axios";
import type { RequestResult, ExtraLayer } from "@types";
import { instance, listQueryGenerator, objectToFormData } from "@utils";
import { DeleteManyParams } from "react-admin";

export function getExtraLayers(): RequestResult<ExtraLayer[]> {
  return instance
    .get(`/config/layers/vector/static/`)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function getExtraLayer(layer_id: number): RequestResult<ExtraLayer> {
  return instance
    .get(`/config/layers/vector/static/${layer_id}`)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function updateExtraLayer(
  layer_id: number,
  data: { upload_file: any }
): RequestResult<ExtraLayer> {
  const form = new FormData();
  form.append("upload_file", data.upload_file.rawFile);
  return instance
    .put(`/config/layers/vector/static/${layer_id}`, form, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function deleteExtraLayer(layer_id: number): RequestResult<ExtraLayer> {
  return instance
    .delete(`/config/layers/vector/static/?id=${layer_id}`)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function createExtraLayer(data: {
  upload_file: any;
}): RequestResult<ExtraLayer> {
  const form = new FormData();
  form.append("upload_file", data.upload_file.rawFile);
  return instance
    .post(`/config/layers/vector/static`, form, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function deleteExtraLayers(
  params: DeleteManyParams
): RequestResult<string> {
  return instance
    .delete(`/config/layers/vector/static/${listQueryGenerator(params.ids)}`)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}
