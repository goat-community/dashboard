import type { AxiosError } from "axios";
import type { RequestResult, Layer, LayerStyle, LayerTile } from "@types";
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

export function updateLayer(
  layer_id: number,
  data: Layer
): RequestResult<Layer> {
  delete data.id;
  return instance
    .put(`/config/layers/library/${layer_id}`, data)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function createLayer(data: Layer): RequestResult<Layer> {
  return instance
    .post(`/config/layers/library`, data)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function getLayerTile(layer_name: string): RequestResult<LayerTile> {
  return instance
    .get(`/layers/tiles/${layer_name}/tilejson.json`)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function deleteLayer(layer_name: string): RequestResult<Layer> {
  return instance
    .delete(`/config/layers/library/${layer_name}`)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function getLayerGroupsEnum(): RequestResult<string[]> {
  return instance
    .get(`openapi.json`)
    .then((response) => response.data.components.schemas.LayerGroupsEnum.enum)
    .catch((err: AxiosError) => {
      throw err;
    });
}
