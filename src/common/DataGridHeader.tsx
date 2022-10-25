import { DatagridHeaderProps, useListContext } from "react-admin";
import { TableHead, TableRow, TableCell } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

interface CustomDatagridHeaderProps extends DatagridHeaderProps {
  sort: any;
  setSort: any;
  sortActive?: boolean;
}

export function DatagridHeader(props: CustomDatagridHeaderProps) {
  const { sort, setSort } = useListContext();
  const inverseOrder = (sort: string) => (sort === "ASC" ? "DESC" : "ASC");

  const handleChangeSort = (field: string) => {
    if (!field) return false;

    const order = field === sort.field ? inverseOrder(sort.order) : "ASC";

    // if order is ASC again and the previous one was "DESC"
    // so we'll clear the sorting thing at all
    if (order === "ASC" && sort.order === "DESC") {
      return setSort({} as any);
    }

    setSort({
      field,
      order: order
    });
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
            onClick={() => {
              if (props.sortActive) {
                handleChangeSort(child.props.source);
              }
            }}
          >
            <div
              style={{
                display: "flex",
                alignContent: "center",
                columnGap: 5,
                cursor: "pointer"
              }}
            >
              {/* @ts-ignore */}
              {child.props.source || "Action"}
              <span>
                {sort.field === child.props.source && (
                  <>
                    {sort.order === "DESC" ? (
                      <ArrowDownwardIcon fontSize="small" />
                    ) : (
                      <ArrowUpwardIcon fontSize="small" />
                    )}
                  </>
                )}
              </span>
            </div>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
