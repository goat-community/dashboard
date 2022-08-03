import type { AxiosError } from "axios";
import type { RequestResult, Layer, LayerStyle } from "@types";
import { instance } from "@utils";

export function getLayersStyle(): RequestResult<LayerStyle[]> {
  return instance
    .get(`/config/layers/library/styles`)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function getLayerStyle(layer_name: string): RequestResult<LayerStyle> {
  return instance
    .get(`/config/layers/library/styles/${layer_name}`)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function updateLayerStyle(
  layer_name: string,
  data: LayerStyle
): RequestResult<LayerStyle> {
  // delete the custom id we made at first step
  delete data.id;
  return instance
    .put(`/config/layers/library/styles/${layer_name}`, data)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function createLayerStyle(data: LayerStyle): RequestResult<LayerStyle> {
  return instance
    .post(`/config/layers/library/styles`, data)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function deleteLayerStyle(
  layer_name: string
): RequestResult<LayerStyle> {
  return instance
    .delete(`/config/layers/library/styles/${layer_name}`)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function getLayers(): RequestResult<Layer[]> {
  return instance
    .get(`/config/layers/library`)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

// single layer
export function getLayer(layer_name: string): RequestResult<Layer> {
  return instance
    .get(`/config/layers/library/${layer_name}`)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}
