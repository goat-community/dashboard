/**
 * Customized layout
 * https://marmelab.com/react-admin/Admin.html#layout
 */
import { styled } from "@mui/material";
import { Sidebar } from "./SideBar";

const Root = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  zIndex: 1,
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  position: "relative"
}));

const AppFrame = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  overflowX: "auto"
}));

const ContentWithSidebar = styled("main")(() => ({
  display: "flex",
  flexGrow: 1
}));

const Content = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 2,
  padding: theme.spacing(3),
  marginTop: "4em",
  paddingLeft: 5
}));

export function PLayout() {
  return (
    <Root>
      <AppFrame>
        <ContentWithSidebar>
          <Sidebar />
          <Content>
            <h1>Child</h1>
          </Content>
        </ContentWithSidebar>
      </AppFrame>
    </Root>
  );
}
