import { useLocation } from "react-router-dom";
import { Link, useTranslate } from "react-admin";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import LayersIcon from "@mui/icons-material/Layers";
import UploadIcon from "@mui/icons-material/Upload";
import ListIcon from "@mui/icons-material/List";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { logout } from "@context/user";
import GoatLogo from "@assets/images/logo_green.webp";
import { useAppDispatch } from "@hooks";

export function Sidebar() {
  let location = useLocation();
  const translate = useTranslate();
  const dispatch = useAppDispatch();

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
          <li>
            <LibraryBooksIcon />
            Layer Library
          </li>
        </Link>
        {(location.pathname.includes("/layers") ||
          location.pathname.includes("/styles") ||
          location.pathname.includes("/upload")) && (
          <div className="collapsed-menu">
            <Link to="layers">
              <li
                className={
                  location.pathname.includes("/layers") ? "active" : ""
                }
              >
                <LayersIcon />
                Layers
              </li>
            </Link>
            <Link to="styles">
              <li
                className={
                  location.pathname.includes("/styles") ? "active" : ""
                }
              >
                <ListIcon />
                Styles
              </li>
            </Link>
            <Link to="upload">
              <li
                className={
                  location.pathname.includes("/upload") ? "active" : ""
                }
              >
                <UploadIcon />
                Upload Data
              </li>
            </Link>
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
