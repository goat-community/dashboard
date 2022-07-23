import { Admin, Resource, defaultTheme } from "react-admin";
/** Pages */
import LoginPage from "@pages/login/Login";
/** Resources */
import { UsersResource, LayersResource } from "@resources";
/** Providers */
import { theme } from "@styles/theme";
import { dataProvider } from "@api";
import { PLayout } from "@common";
import { useAuth } from "@hooks/auth";
import { i18nProvider } from "@utils/i18n";

export default function AppRouter() {
  const auth = useAuth();

  if (auth.authenticated) {
    return (
      <Admin
        i18nProvider={i18nProvider}
        layout={PLayout}
        dataProvider={dataProvider}
        theme={theme}
      >
        <Resource name="users" {...UsersResource} />
        <Resource name="layers" {...LayersResource} />
      </Admin>
    );
  } else {
    return <LoginPage />;
  }
}
