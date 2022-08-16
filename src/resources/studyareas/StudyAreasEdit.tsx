import { useEffect, useState } from "react";
import { batch } from "react-redux";
import { ChipInput } from "@common";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@hooks";
import { getLayerGroups } from "@context/layers";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Chip, CircularProgress, IconButton } from "@mui/material";
import {
  SimpleForm,
  useRedirect,
  Edit,
  Toolbar,
  SaveButton,
  useEditController,
  SelectInput,
  TextInput
} from "react-admin";
import {
  addGeoStoresConfig,
  deleteGeoStoresConfig,
  getGeoStoresConfig,
  getLayerStudyAreasConfig
} from "@context/studyareas";

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
  const studyAreasConfig = useAppSelector((state) => state.studyareas);

  const [layerStudyAreasConfig, setLayerStudyAreasConfig] = useState<
    string[] | null
  >(null);
  const [groupName, setGroupName] = useState<string>("");
  const [geoStoreId, setGeoStoreId] = useState<number | null>(null);

  useEffect(() => {
    return batch(() => {
      dispatch(getLayerGroups());
      dispatch(getGeoStoresConfig(parseFloat(id as string)));
    });
  }, []);

  const postSave = () => {
    if (geoStoreId) {
      dispatch(
        addGeoStoresConfig(parseFloat(id as string), geoStoreId as number)
      );
    }

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
          <CustomToolbar
            enable={(groupName && layerStudyAreasConfig !== null) || geoStoreId}
          />
        }
        onSubmit={postSave}
      >
        <h1>
          Study Area: {id}
          <span style={{ paddingLeft: 20 }}>
            {loading && <CircularProgress />}
          </span>
        </h1>

        <Box display={displayStyle} mt={5}>
          <Box flex={1}>
            <h3>Layer Library</h3>
            <p>Choose Group name to fetch its config</p>
            <br />
            <SelectInput
              source="layers"
              disabled={loading}
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
            {!loading && studyAreasConfig.layerStudyAreasConfig && groupName && (
              <ChipInput
                label="Areas"
                onChange={(area) =>
                  // @ts-ignore
                  setLayerStudyAreasConfig(area)
                }
                defaultValue={[
                  ...studyAreasConfig.layerStudyAreasConfig,
                  ...(layerStudyAreasConfig || [])
                ]}
              />
            )}
          </Box>
        </Box>

        <hr />

        <Box display={displayStyle} mt={5}>
          <Box flex={1}>
            <h3>GeoStores</h3>
            <br />
            {studyAreasConfig.geoStoresConfig.map((i) => (
              <Chip
                label={i.name}
                disabled={loading}
                onDelete={() => {
                  dispatch(
                    deleteGeoStoresConfig(
                      parseFloat(id as string),
                      i.id as number
                    )
                  );
                }}
                sx={{ margin: 1 }}
              />
            ))}
            <br />
            <br />
            <TextInput
              source="geostore"
              label="Write GeoStore ID here to append it to the config"
              variant="outlined"
              disabled={loading}
              fullWidth
              value={geoStoreId}
              onChange={(e) => setGeoStoreId(e.target.value)}
            />
          </Box>
        </Box>
      </SimpleForm>
    </Edit>
  );
}
