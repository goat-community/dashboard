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

const studyAreasFilter = [
  <TextInput
    label="Search"
    variant="outlined"
    source="q"
    alwaysOn
    sx={{ width: 350 }}
  />
];

const StudyAreasPagination = () => (
  <Pagination rowsPerPageOptions={[10, 25, 50, 100]} defaultValue={10} />
);

export default function StudyAreasList() {
  return (
    <List filters={studyAreasFilter} pagination={<StudyAreasPagination />}>
      <Datagrid
        optimized
        isRowSelectable={() => false}
        header={<DatagridHeader />}
        size="small"
      >
        <TextField source="name" sortable={false} />
        <TextField source="id" sortable={false} />
        <TextField source="population" sortable={false} />
        <Stack spacing={1} direction="row">
          <EditButton />
        </Stack>
      </Datagrid>
    </List>
  );
}
