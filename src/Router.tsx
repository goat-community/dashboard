import { Route } from "react-router-dom";
import { Admin, CustomRoutes, Resource } from "react-admin";
/** Pages */
import LoginPage from "@pages/login/Login";
/** Providers */
import { i18nProvider } from "@utils";

export default function AppRouter() {
  return (
    <Admin i18nProvider={i18nProvider} requireAuth>
      <Resource name="users" />
      <CustomRoutes noLayout>
        <Route path="/panel" element={<LoginPage />} />
      </CustomRoutes>
    </Admin>
  );
}
