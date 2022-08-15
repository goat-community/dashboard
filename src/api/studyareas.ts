import type { AxiosError } from "axios";
import type { RequestResult, StudyArea } from "@types";
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
