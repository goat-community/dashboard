import { useEffect, useState } from "react";
import { LoadingIndicator, SelectInput, useRecordContext } from "react-admin";
import { Box, Chip, Dialog, DialogContent } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@hooks";
import { getAllUserRoles } from "@context/user";

export function UserRolesPicker(props: {
  onPickRole: (pickedRole: object) => void;
  editMode?: boolean;
}) {
  const dispatch = useAppDispatch();
  const record = useRecordContext();
  const globalUserRoles = useAppSelector((state) => state.user.globalUserRoles);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pickedRoles, setPickedRoles] = useState<
    { name: string; id: number }[] | []
  >([]);

  useEffect(() => {
    dispatch(getAllUserRoles());
  }, []);

  // listen to picked roles changes
  // and pass it to the parent
  useEffect(() => {
    props.onPickRole(pickedRoles);
  }, [pickedRoles]);

  // copy from record roles on component mount
  useEffect(() => {
    if (record?.roles && props.editMode) {
      setPickedRoles(record.roles);
    }
  }, [record?.roles, props.editMode]);

  const appendToRoles = (id: number) => {
    // check that we don't have the role already
    const role = globalUserRoles.find((role) => role.id === id);
    if (pickedRoles.find((role) => role.id === id)) {
      return false;
    }
    if (role) {
      setPickedRoles([...pickedRoles, role]);
    }
    setDialogOpen(false);
  };

  const removeFromRoles = (id: number) => {
    setPickedRoles(pickedRoles.filter((role) => role.id !== id));
  };

  if (!globalUserRoles.length) {
    return <LoadingIndicator />;
  }

  if (props.editMode && !record.roles) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <div>
        <span>User roles:</span>
        {pickedRoles.map((i) => (
          <Chip
            label={i.name}
            color="default"
            sx={{ margin: 1 }}
            onDelete={() => removeFromRoles(i.id)}
          />
        ))}
        <Chip
          label="+"
          color="success"
          sx={{ margin: 1, backgroundColor: "#2bb381" }}
          onClick={() => setDialogOpen(true)}
        />
      </div>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogContent className="d-flex px-2" sx={{ width: 400 }}>
          <h4>Pick a role for the user</h4>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 13
            }}
          >
            <SelectInput
              source="User roles"
              emptyText={"Select a role"}
              fullWidth
              choices={globalUserRoles}
              onChange={(e) => appendToRoles(e.target.value)}
              variant="outlined"
              optionText="name"
              optionValue="id"
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
