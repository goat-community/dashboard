import { useEffect, useState } from "react";
import {
  SimpleForm,
  useRedirect,
  Edit,
  Toolbar,
  SaveButton,
  useEditController,
  SelectInput
} from "react-admin";
import { batch } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ChipInput } from "@common";
import { useAppDispatch, useAppSelector } from "@hooks";
import { getLayerGroups } from "@context/layers";
import { getLayerStudyAreasConfig } from "@context/studyareas";

const displayStyle = { xs: "block", sm: "flex", width: "100%" };

const CustomToolbar = (props: any) => {
  return (
    <Toolbar
      {...props}
      sx={{ display: "flex", justifyContent: "space-between" }}
    >
      <SaveButton alwaysEnable={props.enable} />
    </Toolbar>
  );
};

export default function StudyAreasEdit() {
  const dispatch = useAppDispatch();
  const { save } = useEditController();
  const redirect = useRedirect();
  const { id } = useParams();

  const loading = useAppSelector((state) => state.network.loading);
  const layerGroups = useAppSelector((state) => state.layers.layerGroups);
  const layerConfigs = useAppSelector(
    (state) => state.studyareas.layerStudyAreasConfig
  );

  const [layerStudyAreasConfig, setLayerStudyAreasConfig] = useState<
    string[] | null
  >(null);
  const [groupName, setGroupName] = useState<string>("");

  useEffect(() => {
    batch(() => {
      dispatch(getLayerGroups());
    });
  }, []);

  const postSave = () => {
    if (layerStudyAreasConfig === null) {
      return false;
    }
    save!({
      group_name: groupName,
      layer_configs: layerStudyAreasConfig
    });
  };

  return (
    <Edit
      sx={{
        justifySelf: "center",
        display: "flex",
        alignSelf: "center"
      }}
    >
      <IconButton sx={{ margin: 1 }} onClick={() => redirect("..")}>
        <CloseIcon />
      </IconButton>

      <SimpleForm
        noValidate
        sx={{ width: 900 }}
        warnWhenUnsavedChanges
        toolbar={
          <CustomToolbar enable={groupName && layerStudyAreasConfig !== null} />
        }
        onSubmit={postSave}
      >
        <Box display={displayStyle}>
          <Box flex={1}>
            <h3>Layer Library</h3>
            <br />
            <p>Choose Group name to fetch its config</p>
            <br />
            <sub>Please save before change the group</sub>
            <SelectInput
              source="name"
              emptyText={"Select a group"}
              fullWidth
              choices={
                layerGroups
                  ? layerGroups.map((group) => {
                      return {
                        id: group,
                        name: group
                      };
                    })
                  : []
              }
              onChange={(e) => {
                setLayerStudyAreasConfig(null);
                setGroupName(e.target.value);
                dispatch(
                  getLayerStudyAreasConfig(
                    parseFloat(id as string),
                    e.target.value
                  )
                );
              }}
              variant="outlined"
              optionText="name"
            />
            {loading && <CircularProgress />}
            {!loading && layerConfigs && groupName && (
              <ChipInput
                label="Areas"
                onChange={(area) =>
                  // @ts-ignore
                  setLayerStudyAreasConfig(area)
                }
                defaultValue={[
                  ...layerConfigs,
                  ...(layerStudyAreasConfig || [])
                ]}
              />
            )}
          </Box>
        </Box>
      </SimpleForm>
    </Edit>
  );
}
