import { useEffect, useState } from "react";
import { batch } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@hooks";
import { getLayerGroups } from "@context/layers";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Box, Chip, CircularProgress, IconButton } from "@mui/material";
import {
  SimpleForm,
  useRedirect,
  Edit,
  Toolbar,
  SaveButton,
  useEditController,
  SelectInput
} from "react-admin";
import {
  addGeoStoresConfig,
  deleteGeoStoresConfig,
  getGeoStoresConfig,
  getLayerStudyAreasConfig
} from "@context/studyareas";
import { LayerPickerComponent } from "./LayerPicker.components";
import { GeoStorePickerComponent } from "./GeoStorePicker.component";

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
        onSubmit={postSave}
        noValidate
        sx={{ width: 900 }}
        warnWhenUnsavedChanges
        toolbar={
          <CustomToolbar
            enable={(groupName && layerStudyAreasConfig !== null) || geoStoreId}
          />
        }
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
              source="layers group"
              disabled={loading}
              emptyText={"Select a layer group"}
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
            <br />
            {[
              ...new Set([
                ...(layerStudyAreasConfig ||
                  studyAreasConfig.layerStudyAreasConfig)
              ])
            ].map((i) => (
              <Chip
                label={i}
                disabled={loading}
                sx={{ margin: 1 }}
                onDelete={() => {
                  setLayerStudyAreasConfig([
                    ...new Set(
                      [
                        ...studyAreasConfig.layerStudyAreasConfig,
                        ...(layerStudyAreasConfig || [])
                      ].filter((l) => l !== i)
                    )
                  ]);
                }}
              />
            ))}

            {groupName && (
              <LayerPickerComponent
                onAppendLayer={(layer_name) =>
                  setLayerStudyAreasConfig([
                    ...new Set([
                      ...studyAreasConfig.layerStudyAreasConfig,
                      ...(layerStudyAreasConfig || []),
                      layer_name
                    ])
                  ])
                }
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
            {!geoStoreId && (
              <GeoStorePickerComponent
                onAppendGeoStore={(id) => setGeoStoreId(id)}
              />
            )}
            {geoStoreId && (
              <Alert severity="info">
                GeoStore picked and will append after save!
              </Alert>
            )}
          </Box>
        </Box>
      </SimpleForm>
    </Edit>
  );
}
