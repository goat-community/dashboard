import {
  Datagrid,
  TextField,
  List,
  EditButton,
  TextInput,
  Pagination
} from "react-admin";
import { Stack } from "@mui/material";
import { DatagridHeader } from "@common";

const layersFilters = [
  <TextInput
    label="Search"
    variant="outlined"
    source="q"
    alwaysOn
    sx={{ width: 350 }}
  />
];

const LayersPagination = () => (
  <Pagination rowsPerPageOptions={[10, 25, 50, 100]} defaultValue={10} />
);

export default function LayersList() {
  return (
    <List filters={layersFilters} pagination={<LayersPagination />}>
      <Datagrid
        header={<DatagridHeader />}
        optimized
        size="small"
        isRowSelectable={() => false}
      >
        <TextField source="type" sortable={false} />
        <TextField source="role_id" sortable={false} />
        <Stack spacing={1} direction="row">
          <EditButton />
        </Stack>
      </Datagrid>
    </List>
  );
}
