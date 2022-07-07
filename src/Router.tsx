import { Route } from "react-router-dom";
import { Admin, CustomRoutes, Resource } from "react-admin";
import UserIcon from "@mui/icons-material/People";
/** Pages */
import LoginPage from "@pages/login/Login";
/** Providers */
import { i18nProvider } from "@utils";
import jsonServerProvider from "ra-data-json-server";

export default function AppRouter() {
  return (
    <Admin
      dataProvider={jsonServerProvider("https://jsonplaceholder.typicode.com")}
      i18nProvider={i18nProvider}
      requireAuth
    >
      <Resource name="users" />
      <CustomRoutes noLayout>
        <Route path="/panel" element={<LoginPage />} />
      </CustomRoutes>
    </Admin>
  );
}
