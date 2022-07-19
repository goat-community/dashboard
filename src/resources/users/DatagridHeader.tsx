import type { DatagridHeaderProps } from "react-admin";
import { TableHead, TableRow, TableCell } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";

export function DatagridHeader(props: DatagridHeaderProps) {
  const iconsList = {
    name: <PersonIcon />,
    surname: <PersonIcon />,
    email: <EmailIcon />
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        {/* @ts-ignore */}
        {props.children!.map((child: JSX.Element) => (
          <TableCell
            key={child.props.source + child.props.label}
            sx={{ fontSize: 18, fontWeight: "bold" }}
          >
            <div
              style={{
                display: "flex",
                alignContent: "center",
                columnGap: 5
              }}
            >
              {/* @ts-ignore */}
              {iconsList[child.props.source]}
              {child.props.source || "Action"}
            </div>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
