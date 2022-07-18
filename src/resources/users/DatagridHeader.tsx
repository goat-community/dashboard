import { TableHead, TableRow, TableCell } from "@mui/material";
import type { DatagridHeaderProps } from "react-admin";

export function DatagridHeader(props: DatagridHeaderProps) {
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
            {child.props.source || "Action"}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
