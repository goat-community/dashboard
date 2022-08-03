/**
 * Customized layout
 * https://marmelab.com/react-admin/Admin.html#layout
 */
import type { LayoutProps } from "react-admin";
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
  marginTop: 0,
  padding: "0 20px 20px 20px",
  marginLeft: 270
}));

export function PLayout(props: LayoutProps) {
  return (
    <Root>
      <AppFrame>
        <ContentWithSidebar>
          <Sidebar />
          <Content>{props.children}</Content>
        </ContentWithSidebar>
      </AppFrame>
    </Root>
  );
}
