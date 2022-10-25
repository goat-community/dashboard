import { useEffect, useState } from "react";
import { SelectInput, useRecordContext } from "react-admin";
import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { PButton } from "@common";
import { useAppDispatch, useAppSelector } from "@hooks";
import { getStudyAreas } from "@context/user";

export function StudyAreaPickerComponent(props: {
  editMode?: boolean;
  sumbittedStudyAreas: (
    activeStudyArea: number,
    pickedStudyAreas: number[]
  ) => void;
}) {
  const record = useRecordContext();
  const dispatch = useAppDispatch();

  const studyAreas = useAppSelector((state) => state.user.studyAreas);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeStudyArea, setActiveStudyArea] = useState<number | null>(() =>
    props.editMode
      ? record.active_study_area_id
        ? record.active_study_area_id
        : null
      : null
  );
  const [pickedStudyAreas, setPickedStudyAreas] = useState<number[] | []>(() =>
    props.editMode ? (record.study_areas ? record.study_areas : []) : []
  );

  useEffect(() => {
    dispatch(getStudyAreas());
  }, []);

  const submit = () => {
    setDialogOpen(false);
    // pass chosen datas
    props.sumbittedStudyAreas(
      activeStudyArea as number,
      pickedStudyAreas as number[]
    );
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center"
        }}
      >
        <p>
          Active Study Area:{" "}
          <b>{studyAreas.find((i) => i.id == activeStudyArea)?.name}</b>
        </p>
        <Chip
          label={pickedStudyAreas.length ? "Change" : "Manage user studyareas"}
          color="success"
          sx={{ margin: 1, backgroundColor: "#2bb381" }}
          onClick={() => setDialogOpen(true)}
        />
      </div>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogContent className="d-flex px-2" sx={{ width: 400 }}>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 13
            }}
          >
            <SelectInput
              source="Append study area"
              emptyText={"Append studyarea..."}
              fullWidth
              choices={studyAreas}
              onChange={(e) => {
                setPickedStudyAreas(
                  Array.from(new Set([...pickedStudyAreas, e.target.value]))
                );
              }}
              variant="outlined"
              optionText="name"
              optionValue="id"
            />
          </Box>

          {/** Picked study areas */}
          {pickedStudyAreas?.length ? (
            <FormControl>
              <FormLabel id="study-areas-group-radio">
                Study Areas <br />
                You can select the active one by checking it
              </FormLabel>
              <RadioGroup
                aria-labelledby="study-areas-group-radio"
                value={activeStudyArea}
                onChange={(e) => setActiveStudyArea(parseInt(e.target.value))}
                name="radio-buttons-group"
              >
                {pickedStudyAreas.map((studyarea) => (
                  <div className="d-flex px-2">
                    <FormControlLabel
                      value={studyarea}
                      control={<Radio />}
                      label={studyAreas.find((i) => i.id == studyarea)?.name}
                    />
                    <IconButton
                      sx={{
                        border: "1px solid red",
                        color: "red"
                      }}
                      onClick={() => {
                        // delete from picked areas
                        setPickedStudyAreas(
                          pickedStudyAreas.filter((i) => i !== studyarea)
                        );
                        // delete it from active study area
                        // if choice is same
                        if (activeStudyArea === studyarea) {
                          setActiveStudyArea(null);
                        }
                      }}
                    >
                      <DeleteIcon sx={{ fontSize: 15 }} />
                    </IconButton>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
          ) : (
            <p>Please pick studyarea...</p>
          )}

          <br />
          <PButton
            text="Done"
            colors="primary"
            style={{ marginTop: 2 }}
            onClick={submit}
            disabled={!activeStudyArea}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
