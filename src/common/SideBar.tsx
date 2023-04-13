import { useLocation } from "react-router-dom";
import { Link, useTranslate } from "react-admin";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import LayersIcon from "@mui/icons-material/Layers";
import UploadIcon from "@mui/icons-material/Upload";
import StorageIcon from "@mui/icons-material/Storage";
import SignpostIcon from "@mui/icons-material/Signpost";
import ListIcon from "@mui/icons-material/List";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import TableChartIcon from "@mui/icons-material/TableChart";
import GoatLogo from "@assets/images/logo_green.webp";
import { logout } from "@context/user";
import { useAppDispatch } from "@hooks";
import StatusChanger from "./StatusChanger";

const paths = [
  { name: "Users", link: "/users", icon: <PeopleIcon /> },
  {
    name: "Layer Library",
    link: "/layers",
    icon: <LibraryBooksIcon />,
    subpaths: [
      { link: "/layers", name: "Layers", icon: <LayersIcon /> },
      { link: "/styles", name: "Styles", icon: <ListIcon /> },
      { link: "/upload", name: "Extra layers", icon: <UploadIcon /> }
    ]
  },
  { name: "Geostores", link: "/geostores", icon: <StorageIcon /> },
  { name: "Studyareas", link: "/studyareas", icon: <SignpostIcon /> },
  { name: "Customization tables", link: "/ctables", icon: <TableChartIcon /> }
];

export function Sidebar() {
  const location = useLocation();
  const translate = useTranslate();
  const dispatch = useAppDispatch();

  return (
    <aside className="sidebar-container">
      <img src={GoatLogo} alt="GOAT logo" width={160} height={40} />
      <h5>{translate("ra.page.dashboard")}</h5>

      <StatusChanger />

      <ul className="sidebar-menu">
        {paths.map((path) => (
          <>
            <Link to={path.link}>
              <li
                className={
                  location.pathname.includes(path.link) ? "active" : ""
                }
              >
                {path.icon}
                {path.name}
              </li>
            </Link>
            {path.subpaths?.length &&
              path.subpaths.map((i) => i.link).includes(location.pathname) && (
                <div className="collapsed-menu">
                  {path.subpaths.map((subpath) => (
                    <Link to={subpath.link} key={subpath.link}>
                      <li
                        className={
                          location.pathname.includes(subpath.link)
                            ? "active"
                            : ""
                        }
                      >
                        {subpath.icon}
                        {subpath.name}
                      </li>
                    </Link>
                  ))}
                </div>
              )}
          </>
        ))}

        <li className="logout" onClick={() => dispatch(logout())}>
          <LogoutIcon />
          Logout
        </li>
      </ul>
    </aside>
  );
}
