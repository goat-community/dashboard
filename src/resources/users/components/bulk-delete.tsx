import { useState } from "react";
import { Confirm, useDeleteMany, useUnselectAll } from "react-admin";
import { PButton } from "@common";

export function BulkDelete({ selectedIds }: { selectedIds?: number[] }) {
  const [open, setOpen] = useState(false);
  const unselectAll = useUnselectAll("users");
  const [deleteMany, { isLoading, error }] = useDeleteMany("users", {
    ids: selectedIds
  });

  const handleClick = () => setOpen(true);
  const handleDialogClose = () => setOpen(false);
  const handleConfirm = () => {
    deleteMany();
    unselectAll();
    setOpen(false);
  };

  if (error) {
    return <p>ERROR</p>;
  }
  return (
    <>
      <PButton
        disabled={isLoading}
        onClick={handleClick}
        text="Delete selected users"
        colors="error"
        size="small"
      />
      <Confirm
        isOpen={open}
        loading={isLoading}
        title="Delete selected users?"
        content="Are you sure you want to delete these users?"
        onConfirm={handleConfirm}
        onClose={handleDialogClose}
      />
    </>
  );
}
