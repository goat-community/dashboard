import { Datagrid, TextField, List, EditButton } from "react-admin";
import { Stack } from "@mui/material";
import { DeleteButton } from "./DeleteButton";
import { DatagridHeader } from "./DatagridHeader";

export function UsersList() {
  return (
    <List>
      <Datagrid
        optimized
        sx={{
          "& .RaDatagrid-row": {
            alignItems: "flex-start"
          }
        }}
        isRowSelectable={() => false}
        header={<DatagridHeader />}
      >
        <TextField source="name" sortable={false} />
        <TextField source="surname" sortable={false} />
        <TextField source="email" sortable={false} />
        <TextField source="roles" sortable={false} />
        <Stack spacing={1} direction="row">
          {/* <IconButton sx={{ border: "1px solid black", padding: 1 }}>
            <EditIcon sx={{ fontSize: 18 }} />
          </IconButton> */}
          <EditButton />
          <DeleteButton />
        </Stack>
      </Datagrid>
    </List>
  );
}
