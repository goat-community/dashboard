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
import type { LayerStyle, User } from "@types";

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
    return UserProvider.deleteUser(params);
  },

  getMany: (resource): any => true,
  getManyReference: (resource): any => true,
  updateMany: (resource): any => true,
  deleteMany: (resource): any => true
};
