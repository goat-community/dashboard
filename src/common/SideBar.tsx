import { useLocation } from "react-router-dom";
import { Link, useTranslate } from "react-admin";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import LayersIcon from "@mui/icons-material/Layers";
import UploadIcon from "@mui/icons-material/Upload";
import StorageIcon from "@mui/icons-material/Storage";
import ListIcon from "@mui/icons-material/List";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import GoatLogo from "@assets/images/logo_green.webp";
import { logout } from "@context/user";
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

        {/**  Layer Library */}
        <Link to="layers">
          <li>
            <LibraryBooksIcon />
            Layer Library
          </li>
        </Link>
        {["/layers", "/styles", "/upload"].includes(location.pathname) && (
          <div className="collapsed-menu">
            {[
              { path: "/layers", name: "Layers", icon: <LayersIcon /> },
              { path: "/styles", name: "Styles", icon: <ListIcon /> },
              { path: "/upload", name: "Extra layers", icon: <UploadIcon /> }
            ].map((item) => (
              <Link to={item.path} key={item.path}>
                <li
                  className={
                    location.pathname.includes(item.path) ? "active" : ""
                  }
                >
                  {item.icon}
                  {item.name}
                </li>
              </Link>
            ))}
          </div>
        )}

        <Link to={"/geostores"}>
          <li
            className={location.pathname.includes("/geostores") ? "active" : ""}
          >
            <StorageIcon />
            Geostores
          </li>
        </Link>

        <li className="logout" onClick={() => dispatch(logout())}>
          <LogoutIcon />
          Logout
        </li>
      </ul>
    </aside>
  );
}
