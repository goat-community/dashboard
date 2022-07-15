import { Admin, Resource } from "react-admin";
/** Pages */
import LoginPage from "@pages/login/Login";
/** Resources */
import { UsersResource } from "@resources";
/** Providers */
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
      >
        <Resource name="users" {...UsersResource} />
      </Admin>
    );
  } else {
    return <LoginPage />;
  }
}
