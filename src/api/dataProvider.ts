/**
 * React Admin uses a way to fetch data on
 * resources componentes called dataProvider.
 * In this file we will create our custom DP
 * https://marmelab.com/react-admin/Actions.html#getting-the-dataprovider-instance
 */
import type {
  CreateResult,
  DataProvider,
  DeleteManyResult,
  DeleteResult,
  GetListResult,
  GetOneResult,
  UpdateResult
} from "react-admin";
import { UserProvider } from "@context/user";
import { LayerStylesProvider } from "@context/layerStyles";
import { LayerProvider } from "@context/layers";
import { ExtraLayerProvider } from "@context/extraLayers";
import { GeoStoreProvider } from "@context/geostores";
import { StudyAreaProvider } from "@context/studyareas";
import type { GeoStore, Layer, LayerStyle, Opportunity, User } from "@types";

export const dataProvider: DataProvider = {
  getList: (resource, params): Promise<GetListResult> => {
    // Return promises based on the resource provided
    if (resource === "users") {
      return UserProvider.getUsersList(params);
    }
    if (resource === "styles") {
      return LayerStylesProvider.getLayersStyleList(params);
    }
    if (resource === "layers") {
      return LayerProvider.getLayersList(params);
    }
    if (resource === "upload") {
      return ExtraLayerProvider.getExtraLayersList(params);
    }
    if (resource === "geostores") {
      return GeoStoreProvider.getGeoStoresList(params);
    }
    if (resource === "studyareas") {
      return StudyAreaProvider.getStudyAreasList(params);
    }
    return UserProvider.getUsersList(params);
  },
  getOne: (resource, params): Promise<GetOneResult> => {
    // Return promises based on the resource provided
    if (resource === "users") {
      return UserProvider.getUser(params.id);
    }
    if (resource === "styles") {
      return LayerStylesProvider.getLayerStyle(params.id);
    }
    if (resource === "layers") {
      return LayerProvider.getLayer(params.id);
    }
    if (resource === "upload") {
      return ExtraLayerProvider.getExtraLayer(params.id);
    }
    if (resource === "geostores") {
      return GeoStoreProvider.getGeoStore(params.id);
    }
    if (resource === "studyareas") {
      return new Promise((resolve) =>
        resolve({
          data: {
            id: params.id,
            name: "Study Area " + params.id
          }
        })
      );
    }
    return UserProvider.getUser(params.id);
  },
  create: (resource, params): Promise<CreateResult> => {
    // Return promises based on the resource provided
    if (resource === "users") {
      return UserProvider.createUser(params.data);
    }
    if (resource === "styles") {
      return LayerStylesProvider.createLayerStyle(params.data as LayerStyle);
    }
    if (resource === "layers") {
      return LayerProvider.createLayer(params.data as Layer);
    }
    if (resource === "upload") {
      return ExtraLayerProvider.createExtraLayer(
        params.data as { upload_file: string }
      );
    }
    if (resource === "geostores") {
      return GeoStoreProvider.createGeoStore(params.data as GeoStore);
    }
    if (resource === "studyareas") {
      return StudyAreaProvider.createStudyAreaOpportunity(params.data as any);
    }
    return UserProvider.createUser(params.data);
  },
  update: (resource, params): Promise<UpdateResult> => {
    // Return promises based on the resource provided
    if (resource === "users") {
      return UserProvider.updateUser(params.id as number, params.data as User);
    }
    if (resource === "styles") {
      return LayerStylesProvider.updateLayerStyle(
        params.id as string,
        params.data as LayerStyle
      );
    }
    if (resource === "layers") {
      return LayerProvider.updateLayer(
        params.id as number,
        params.data as Layer
      );
    }
    if (resource === "upload") {
      return ExtraLayerProvider.updateExtraLayer(
        params.id as number,
        params.data as { upload_file: string }
      );
    }
    if (resource === "geostores") {
      return GeoStoreProvider.updateGeoStore(
        params.id as number,
        params.data as GeoStore
      );
    }
    if (resource === "studyareas") {
      return StudyAreaProvider.updateStudyAreaLayerConfig(
        params.id as number,
        params.data as any
      );
    }
    return UserProvider.updateUser(params.id as number, params.data as User);
  },
  delete: (resource, params): Promise<DeleteResult> => {
    // Return promises based on the resource provided
    if (resource === "users") {
      return UserProvider.deleteUser(params);
    }
    if (resource === "styles") {
      return LayerStylesProvider.deleteLayerStyle(params.id as string);
    }
    if (resource === "layers") {
      return LayerProvider.deleteLayer(params.id as string);
    }
    if (resource === "upload") {
      return ExtraLayerProvider.deleteExtraLayer(params.id as number);
    }
    if (resource === "geostores") {
      return GeoStoreProvider.deleteGeoStore(params.id as number);
    }
    if (resource === "studyareas") {
      return StudyAreaProvider.deleteStudyAreaOpportunity(params.id as number);
    }
    return UserProvider.deleteUser(params);
  },
  deleteMany: (resource, params): Promise<DeleteManyResult> => {
    if (resource === "users") {
      return UserProvider.deleteUsers(params as { ids: number[]; id: any });
    }
    return UserProvider.deleteUsers(params as { ids: number[]; id: any });
  },

  getMany: (resource): any => true,
  getManyReference: (resource): any => true,
  updateMany: (resource): any => true
};
