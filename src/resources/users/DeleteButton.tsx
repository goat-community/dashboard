import { useState } from "react";
import { useDelete, useRecordContext } from "react-admin";
import { Box, Dialog, DialogContent, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { PButton } from "@common";

export function DeleteButton() {
  const record = useRecordContext();
  const [confimationName, setConfimationName] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteOne, { isLoading, error }] = useDelete();

  const handleClick = () => {
    setDeleteDialogOpen(true);
  };

  const deleteUser = () => {
    deleteOne("users", { id: record.id, previousData: record });
  };

  if (error) {
    return <p>ERROR</p>;
  }

  return (
    <>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogContent className="d-flex px-2">
          <h4>Are you sure you want to delete {record.name}?</h4>
          <Box style={{ marginTop: 13 }}>
            <TextField
              label={`Please type ${record.name} to confirm the deletion`}
              onChange={(e) => setConfimationName(e.target.value)}
              value={confimationName}
              style={{ width: "100%" }}
              variant="outlined"
            />
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 13
            }}
          >
            <PButton
              disabled={
                record.name.toLowerCase() !== confimationName.toLowerCase()
              }
              text={`Delete ${record.name}`}
              colors="error"
              onClick={() => {
                setDeleteDialogOpen(false);
                deleteUser();
              }}
            />
          </Box>
        </DialogContent>
      </Dialog>
      <IconButton
        sx={{ border: "1px solid black", color: "black" }}
        onClick={handleClick}
        disabled={isLoading}
      >
        <DeleteIcon sx={{ fontSize: 18 }} />
      </IconButton>
    </>
  );
}
