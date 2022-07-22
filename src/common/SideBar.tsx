import { useState } from "react";
import { Link, useTranslate } from "react-admin";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import LayersIcon from "@mui/icons-material/Layers";
import ListIcon from "@mui/icons-material/List";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { logout } from "@context/user";
import GoatLogo from "@assets/images/logo_green.webp";
import { useAppDispatch } from "@hooks";

export function Sidebar() {
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className="sidebar-container">
      <img src={GoatLogo} alt="GOAT logo" width={160} height={40} />
      <h5>{translate("ra.page.dashboard")}</h5>
      <ul className="sidebar-menu">
        <Link to={"/users"}>
          <li>
            <PeopleIcon />
            Users
          </li>
        </Link>
        <li onClick={() => setCollapsed((prevState) => !prevState)}>
          <LayersIcon />
          Layers
        </li>
        {collapsed && (
          <div className="collapsed-menu">
            <Link to="layers">
              <li>
                <ListIcon />
                Styles
              </li>
            </Link>
            <li>
              <FileUploadIcon />
              Upload
            </li>
          </div>
        )}
        <li className="logout" onClick={() => dispatch(logout())}>
          <LogoutIcon />
          Logout
        </li>
      </ul>
    </aside>
  );
}
