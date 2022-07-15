import { useDelete, useRecordContext } from "react-admin";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export function DeleteButton() {
  const record = useRecordContext();
  const [deleteOne, { isLoading, error }] = useDelete();
  const handleClick = () => {
    deleteOne("users", { id: record.id, previousData: record });
  };

  if (error) {
    return <p>ERROR</p>;
  }

  return (
    <IconButton
      sx={{ border: "1px solid black", color: "black" }}
      onClick={handleClick}
      disabled={isLoading}
    >
      <DeleteIcon sx={{ fontSize: 18 }} />
    </IconButton>
  );
}
