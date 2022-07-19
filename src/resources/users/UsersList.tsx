import {
  Datagrid,
  TextField,
  List,
  EditButton,
  TextInput,
  Pagination
} from "react-admin";
import { Stack } from "@mui/material";
import { DeleteButton } from "./DeleteButton";
import { DatagridHeader } from "./DatagridHeader";

const usersFilters = [
  <TextInput
    label="Search"
    variant="outlined"
    source="q"
    alwaysOn
    sx={{ width: 350 }}
  />
];

const UsersPagination = () => (
  <Pagination rowsPerPageOptions={[10, 25, 50, 100]} defaultValue={10} />
);

export function UsersList() {
  return (
    <List filters={usersFilters} pagination={<UsersPagination />}>
      <Datagrid
        optimized
        isRowSelectable={() => false}
        header={<DatagridHeader />}
        size="small"
      >
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
