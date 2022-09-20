import {
  Datagrid,
  TextField,
  List,
  EditButton,
  TextInput,
  Pagination,
  useListContext,
  Toolbar
} from "react-admin";
import { Button } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { DeleteButton } from "./DeleteButton";
import { DatagridHeader } from "@common";

const usersFilters = [
  <TextInput
    label="Search"
    variant="outlined"
    source="q"
    alwaysOn
    sx={{ width: 350 }}
  />
];

const UsersPagination = (): JSX.Element => {
  const { page, perPage, total, setPage } = useListContext();
  const nbPages = Math.ceil(total / perPage) || 1;
  return (
    <>
      {nbPages > 1 && (
        <Toolbar>
          {page > 1 && (
            <Button
              color="primary"
              key="prev"
              onClick={() => setPage(page - 1)}
            >
              <ChevronLeft />
              Prev
            </Button>
          )}
          {page !== nbPages && (
            <Button
              color="primary"
              key="next"
              onClick={() => setPage(page + 1)}
            >
              Next
              <ChevronRight />
            </Button>
          )}
          <p>Total: {total}</p>
        </Toolbar>
      )}
    </>
  );
};

// const UsersPagination = () => (
//   <Pagination rowsPerPageOptions={[10, 25, 50, 100]} defaultValue={10} />
// );

export default function UsersList() {
  return (
    <List filters={usersFilters} pagination={<UsersPagination />}>
      <Datagrid optimized header={<DatagridHeader />} size="small">
        <TextField source="name" sortable={false} />
        <TextField source="surname" sortable={false} />
        <TextField source="email" sortable={false} />
        <Stack spacing={1} direction="row">
          <EditButton />
          <DeleteButton />
        </Stack>
      </Datagrid>
    </List>
  );
}
