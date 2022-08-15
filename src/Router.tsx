import { Admin, Resource } from "react-admin";
/** Pages */
import LoginPage from "@pages/login/Login";
/** Resources */
import {
  UsersResource,
  LayerLibraryResources as LLR,
  GeoStoresResource,
  StudyAreasResource
} from "@resources";
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
        <Resource name="styles" {...LLR.LayerStylesResource} />
        <Resource name="layers" {...LLR.LayersResource} />
        <Resource name="upload" {...LLR.ExtraLayersResource} />
        <Resource name="geostores" {...GeoStoresResource} />
        <Resource name="studyareas" {...StudyAreasResource} />
      </Admin>
    );
  } else {
    return <LoginPage />;
  }
}
