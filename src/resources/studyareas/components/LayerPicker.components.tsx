import { useEffect, useState } from "react";
import { Box, Chip, Dialog, DialogContent } from "@mui/material";
import { PButton } from "@common";
import { SelectInput } from "react-admin";
import { getLayers } from "@context/layers";
import { useAppDispatch, useAppSelector } from "@hooks";

export function LayerPickerComponent(props: {
  onAppendLayer: (layerID: string) => void;
}) {
  const dispatch = useAppDispatch();
  const layers = useAppSelector((state) => state.layers.layers);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [choosedLayer, setChoosedLayer] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getLayers());
  }, []);

  const submit = () => {
    if (choosedLayer) {
      setDialogOpen(false);
      props.onAppendLayer(choosedLayer);
    }
  };

  return (
    <>
      <Chip
        label="Add Layer + "
        color="success"
        sx={{ margin: 1 }}
        onClick={() => setDialogOpen(true)}
      />

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogContent className="d-flex px-2">
          <h4>Pick layer to append to the Layer Groups</h4>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 13
            }}
          >
            <SelectInput
              source="layers"
              emptyText={"Select a layer group"}
              fullWidth
              choices={layers}
              onChange={(e) => {
                setChoosedLayer(e.target.value);
              }}
              variant="outlined"
              optionText="name"
              optionValue="name"
            />
          </Box>
          <PButton text={`Append`} colors="primary" onClick={submit} />
        </DialogContent>
      </Dialog>
    </>
  );
}
