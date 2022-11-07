import {useEffect, useState} from 'react';
import {useRecordContext} from 'react-admin';
import {
  Chip,
  Dialog,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Checkbox,
  FormGroup,
  TextField,
} from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import {PButton} from '@common';
import {useAppDispatch, useAppSelector} from '@hooks';
import {getStudyAreasList} from '@context/studyareas';

export function StudyAreaPickerComponent(props: {
  editMode?: boolean;
  sumbittedStudyAreas: (
    activeStudyArea: number,
    pickedStudyAreas: number[]
  ) => void;
}) {
  const record = useRecordContext();
  const dispatch = useAppDispatch();
  const studyAreas = useAppSelector((state) => state.studyareas.studyAreas);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeStudyArea, setActiveStudyArea] = useState<number | null>(() =>
    props.editMode ?
      record.active_study_area_id ?
        record.active_study_area_id :
        null :
      null,
  );
  const [pickedStudyAreas, setPickedStudyAreas] = useState<number[] | []>([]);
  const [searchParam, setSearchParam] = useState<string>('');

  useEffect(() => {
    dispatch(getStudyAreasList());
  }, []);

  // copy from record roles on component mount
  useEffect(() => {
    if (record?.study_areas && props.editMode) {
      setPickedStudyAreas(record.study_areas);
    }
  }, [record?.study_areas, props.editMode]);

  const submit = () => {
    setDialogOpen(false);
    // pass chosen datas
    props.sumbittedStudyAreas(
      activeStudyArea as number,
      pickedStudyAreas as number[],
    );
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <p>
          Active Study Area:{' '}
          <b>{studyAreas.find((i) => i.id == activeStudyArea)?.name}</b>
        </p>
        <Chip
          label={pickedStudyAreas.length ? 'Change' : 'Manage user studyareas'}
          color="success"
          sx={{margin: 1, backgroundColor: '#2bb381'}}
          onClick={() => setDialogOpen(true)}
        />
      </div>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogContent className="d-flex px-2" sx={{width: 400, height: 500}}>
          {studyAreas?.length ? (
            <FormControl>
              <FormLabel id="study-areas-group-radio">
                Study Areas <br />
                You can select the active one by checking it
                <div>
                  <PButton
                    text="Check all!"
                    colors="primary"
                    onClick={() => {
                      setPickedStudyAreas(studyAreas.map((i) => i.id));
                    }}
                    size="small"
                  />
                  <PButton
                    text="Uncheck all!"
                    colors="error"
                    onClick={() => {
                      setPickedStudyAreas([]);
                      setActiveStudyArea(null);
                    }}
                    size="small"
                    style={{marginLeft: 1}}
                  />
                </div>
              </FormLabel>
              <br />
              <TextField
                label="Type to filter"
                onChange={(e) => setSearchParam(e.target.value)}
                variant="outlined"
                sx={{width: '100%'}}
              />
              <br />
              <FormGroup>
                {studyAreas
                    .filter((i) =>
                      i.name.toLowerCase().includes(searchParam.toLowerCase()),
                    )
                    .map((studyarea) => (
                      <div className="d-flex px-2">
                        <FormControlLabel
                        /** @ts-ignore */
                          checked={pickedStudyAreas.includes(studyarea?.id)}
                          control={<Checkbox name={studyarea.name} />}
                          label={studyarea.name}
                          onChange={() => {
                          // @ts-ignore
                            if (pickedStudyAreas.includes(studyarea.id)) {
                            // remove it from the list
                              setPickedStudyAreas(
                                  pickedStudyAreas.filter((i) => i !== studyarea.id),
                              );
                              // remove the active if it's this one
                              if (activeStudyArea === studyarea.id) {
                                setActiveStudyArea(null);
                              }
                            } else {
                              setPickedStudyAreas(
                                  Array.from(
                                      new Set([...pickedStudyAreas, studyarea.id]),
                                  ),
                              );
                            }
                          }}
                        />
                        {/** @ts-ignore */}
                        {pickedStudyAreas.includes(studyarea?.id) && (
                          <IconButton
                            onClick={() => {
                            // delete it from active study area
                            // if choice is same
                              if (activeStudyArea === studyarea.id) {
                                setActiveStudyArea(null);
                              } else {
                                setActiveStudyArea(studyarea.id);
                              }
                            }}
                          >
                            {activeStudyArea === studyarea.id ? (
                            <RadioButtonCheckedIcon color="success" />
                          ) : (
                            <RadioButtonUncheckedIcon color="success" />
                          )}
                          </IconButton>
                        )}
                      </div>
                    ))}
              </FormGroup>
            </FormControl>
          ) : (
            <p>Please pick studyarea...</p>
          )}

          <br />
          <PButton
            text="Done"
            colors="primary"
            style={{marginTop: 2}}
            onClick={submit}
            disabled={!activeStudyArea}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
