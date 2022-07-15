import { Datagrid, TextField, List } from "react-admin";
import { Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
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
        <TextField source="surname" sortable={false} />
        <TextField source="name" sortable={false} />
        <TextField source="email" sortable={false} />
        <Stack spacing={1} direction="row">
          <IconButton sx={{ border: "1px solid black", padding: 1 }}>
            <EditIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <DeleteButton />
        </Stack>
      </Datagrid>
    </List>
  );
}
