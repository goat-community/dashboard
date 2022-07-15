import { TableHead, TableRow, TableCell } from "@mui/material";

export function DatagridHeader(props: any) {
  return (
    <TableHead>
      <TableRow>
        <TableCell></TableCell>{" "}
        {/* empty cell to account for the select row checkbox in the body */}
        {props.children.map((child: JSX.Element) => (
          <TableCell
            key={child.props.source}
            sx={{ fontSize: 18, fontWeight: "bold" }}
          >
            {child.props.source || "Action"}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
