import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link, useTranslate } from "react-admin";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import LayersIcon from "@mui/icons-material/Layers";
import ListIcon from "@mui/icons-material/List";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { logout } from "@context/user";
import GoatLogo from "@assets/images/logo_green.webp";
import { useAppDispatch } from "@hooks";

export function Sidebar() {
  let location = useLocation();
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className="sidebar-container">
      <img src={GoatLogo} alt="GOAT logo" width={160} height={40} />
      <h5>{translate("ra.page.dashboard")}</h5>
      <ul className="sidebar-menu">
        <Link to={"/users"}>
          <li className={location.pathname.includes("/users") ? "active" : ""}>
            <PeopleIcon />
            Users
          </li>
        </Link>
        <Link to="layers">
          <li
            onClick={() => setCollapsed((prevState) => !prevState)}
            className={location.pathname.includes("/layers") ? "active" : ""}
          >
            <LibraryBooksIcon />
            Layer Library
          </li>
          {collapsed && (
            <div className="collapsed-menu">
              <li
                className={
                  location.pathname.includes("/layers") ? "active" : ""
                }
              >
                <LayersIcon />
                Layers
              </li>
              <li
                className={
                  location.pathname.includes("/styles") ? "active" : ""
                }
              >
                <ListIcon />
                Styles
              </li>
            </div>
          )}
        </Link>
        <li className="logout" onClick={() => dispatch(logout())}>
          <LogoutIcon />
          Logout
        </li>
      </ul>
    </aside>
  );
}
