import { useEffect, useState } from "react";
import { Box, Chip, Dialog, DialogContent } from "@mui/material";
import { PButton } from "@common";
import { useAppDispatch, useAppSelector } from "@hooks";
import { getGeoStores } from "@context/geostores";
import { SelectInput } from "react-admin";

export function GeoStorePickerComponent(props: {
  onAppendGeoStore: (geoStoreId: number) => void;
}) {
  const dispatch = useAppDispatch();
  const geostores = useAppSelector((state) => state.geostores.geostores);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [choosedID, setChoosedID] = useState<number | null>(null);

  useEffect(() => {
    dispatch(getGeoStores());
  }, []);

  const submit = () => {
    if (choosedID) {
      setDialogOpen(false);
      props.onAppendGeoStore(choosedID);
    }
  };

  return (
    <>
      <Chip
        label="Add GeoStore + "
        color="success"
        sx={{ margin: 1, backgroundColor: "#2bb381" }}
        onClick={() => setDialogOpen(true)}
      />

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogContent className="d-flex px-2">
          <h4>Pick Geostore to append to the GeoStores list</h4>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 13
            }}
          >
            <SelectInput
              source="geostores"
              emptyText={"Select a geostore"}
              fullWidth
              choices={geostores}
              onChange={(e) => {
                setChoosedID(e.target.value);
              }}
              variant="outlined"
              optionText="name"
              optionValue="id"
            />
          </Box>
          <PButton text={`Append`} colors="primary" onClick={submit} />
        </DialogContent>
      </Dialog>
    </>
  );
}
