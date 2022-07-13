import { Admin, Resource } from "react-admin";
/** Pages */
import LoginPage from "@pages/login/Login";
/** Providers */
import { i18nProvider } from "@utils/i18n";
import { useAuth } from "@hooks/auth";
import { PLayout } from "@common";

export default function AppRouter() {
  const auth = useAuth();

  if (auth.authenticated) {
    return (
      <Admin i18nProvider={i18nProvider} layout={PLayout}>
        <Resource name="users" />
      </Admin>
    );
  } else {
    return <LoginPage />;
  }
}
