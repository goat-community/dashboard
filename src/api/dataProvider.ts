/**
 * React Admin uses a way to fetch data on
 * resources componentes called dataProvider.
 * In this file we will create our custom DP
 * https://marmelab.com/react-admin/Actions.html#getting-the-dataprovider-instance
 */
import type { DataProvider, DeleteResult, GetListResult } from "react-admin";
import { UserProvider } from "@context/user";

export const dataProvider: DataProvider = {
  getList: (resource): Promise<GetListResult> => {
    // Return promises based on the resource provided
    if (resource === "users") {
      return UserProvider.getUsersList();
    }
    return UserProvider.getUsersList();
  },

  getOne: (resource): any => new Promise((resolve) => resolve(resource)),

  getMany: (resource): any => new Promise((resolve) => resolve(resource)),

  getManyReference: (resource): any =>
    new Promise((resolve) => resolve(resource)),

  create: (resource): any => new Promise((resolve) => resolve(resource)),

  update: (resource): any => new Promise((resolve) => resolve(resource)),

  updateMany: (resource): any => new Promise((resolve) => resolve(resource)),

  delete: (resource, params): Promise<DeleteResult> => {
    // Return promises based on the resource provided
    if (resource === "users") {
      return UserProvider.deleteUser(params);
    }
    return UserProvider.deleteUser(params);
  },

  deleteMany: (resource): any => new Promise((resolve) => resolve(resource))
};
