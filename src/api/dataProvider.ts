/**
 * React Admin uses a way to fetch data on
 * resources componentes called dataProvider.
 * In this file we will create our custom DP
 * https://marmelab.com/react-admin/Actions.html#getting-the-dataprovider-instance
 */
import type { DataProvider, GetListResult } from "react-admin";
import { UserProvider } from "@context/user";

export const dataProvider: DataProvider = {
  getList: (resource, params): Promise<GetListResult> | any => {
    if (resource === "users") {
      return UserProvider.getUsersList(params);
    }
  },
  getOne: (resource): any => new Promise((resolve) => resolve(resource)),
  getMany: (resource): any => new Promise((resolve) => resolve(resource)),
  getManyReference: (resource): any =>
    new Promise((resolve) => resolve(resource)),
  create: (resource): any => new Promise((resolve) => resolve(resource)),
  update: (resource): any => new Promise((resolve) => resolve(resource)),
  updateMany: (resource): any => new Promise((resolve) => resolve(resource)),
  delete: (resource): any => new Promise((resolve) => resolve(resource)),
  deleteMany: (resource): any => new Promise((resolve) => resolve(resource))
};
