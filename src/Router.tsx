import { Route } from "react-router-dom";
import { Admin, CustomRoutes, Resource } from "react-admin";
/** Pages */
import LoginPage from "@pages/login/Login";
/** Providers */
import { i18nProvider } from "@utils";
import { useAuth } from "@hooks";

export default function AppRouter() {
  const auth = useAuth();

  if (auth.authenticated) {
    return (
      <Admin i18nProvider={i18nProvider}>
        <Resource name="users" />
      </Admin>
    );
  } else {
    return <LoginPage />;
  }
}
