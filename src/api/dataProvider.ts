/**
 * React Admin uses a way to fetch data on
 * resources componentes called dataProvider.
 * In this file we will create our custom DP
 * https://marmelab.com/react-admin/Actions.html#getting-the-dataprovider-instance
 */
import type {
  CreateResult,
  DataProvider,
  DeleteResult,
  GetListResult,
  GetOneResult,
  UpdateResult
} from "react-admin";
import { UserProvider } from "@context/user";
import { LayerStylesProvider } from "@context/layerStyles";
import { LayerProvider } from "@context/layers";
import { ExtraLayerProvider } from "@context/extraLayers";
import type { Layer, LayerStyle, User } from "@types";

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
    if (resource === "upload") {
      return ExtraLayerProvider.createExtraLayer(
        params.data as { upload_file: string }
      );
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
    if (resource === "upload") {
      return ExtraLayerProvider.deleteExtraLayer(params.id as number);
    }
    return UserProvider.deleteUser(params);
  },

  getMany: (resource): any => true,
  getManyReference: (resource): any => true,
  updateMany: (resource): any => true,
  deleteMany: (resource): any => true
};
