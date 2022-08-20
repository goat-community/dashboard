import type { AxiosError } from "axios";
import type {
  GeoStore,
  Opportunity,
  OpportunityGroup,
  RequestResult,
  StudyArea
} from "@types";
import { instance } from "@utils";

export function getStudyAreas(): RequestResult<StudyArea[]> {
  return instance
    .get(`/read/table/all/study_area`)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function getLayersStudyAreas(
  study_area_id: number,
  group_name: string
): RequestResult<string[]> {
  return instance
    .get(`/config/study-area/settings/${study_area_id}/${group_name}`)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function updateStudyAreaLayerConfig(
  study_area_id: number,
  group_name: string,
  layers: string[]
): RequestResult<string[]> {
  return instance
    .put(`/config/study-area/settings/${study_area_id}/${group_name}`, layers)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function getGeoStoresConfig(
  study_area_id: number
): RequestResult<GeoStore[]> {
  return instance
    .get(`/config/geostores/study_area/${study_area_id}`)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function deleteGeoStoresConfig(
  study_area_id: number,
  geostore_id: number
): RequestResult<GeoStore[]> {
  return instance
    .delete(
      `/config/geostores/study_area/${study_area_id}/remove/${geostore_id}`
    )
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function addGeoStoresConfig(
  study_area_id: number,
  geostore_id: number
): RequestResult<GeoStore[]> {
  return instance
    .post(`/config/geostores/study_area/${study_area_id}/add/${geostore_id}`)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function getStudyAreasOpportunities(): RequestResult<Opportunity[]> {
  return instance
    .get(`/config/opportunity-study-area`)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function getOpportunitiesGroup(): RequestResult<OpportunityGroup[]> {
  return instance
    .get(`/config/opportunities/groups`)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function getOpportunitiesList(): RequestResult<Opportunity[]> {
  return instance
    .get(`/config/opportunities`)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function createStudyAreaOpportunity(
  data: Opportunity
): RequestResult<Opportunity> {
  return instance
    .post(`/config/opportunity-study-area`, data)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}
