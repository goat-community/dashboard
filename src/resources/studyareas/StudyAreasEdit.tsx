import { useEffect, useState } from "react";
import { batch } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@hooks";
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
  getLayerStudyAreasConfig,
  getStudyAreasOpportunities
} from "@context/studyareas";
import { LayerPickerComponent } from "./components/LayerPicker.components";
import { GeoStorePickerComponent } from "./components/GeoStorePicker.component";
import { OpportunityCreatorComponent } from "./components/OpportunityCreator.component";
import { OpportunityViewerComponent } from "./components/OpportunityViewer.component";
import { Opportunity } from "@types";
import { getLayerGroups } from "@context/layers";
import { removeEmptyProperties } from "@utils";

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
  const [opportunityData, setOpportunityData] = useState<null | Opportunity>(
    null
  );

  useEffect(() => {
    return batch(() => {
      dispatch(getStudyAreasOpportunities(parseFloat(id as string)));
      dispatch(getGeoStoresConfig(parseFloat(id as string)));
      dispatch(getLayerGroups());
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
      layer_configs: removeEmptyProperties(layerStudyAreasConfig)
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
        <p style={{ fontSize: 30, fontWeight: "bold" }}>
          Study Area: {id}
          <span style={{ paddingLeft: 20 }}>
            {loading && <CircularProgress />}
          </span>
        </p>

        <Box display={displayStyle} mt={5}>
          <Box flex={1}>
            <p style={{ fontSize: 20 }}>Layer Library</p>
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
            <p style={{ fontSize: 20 }}>GeoStores</p>
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

        <hr />

        <Box display={displayStyle} mt={5}>
          <Box flex={1}>
            <p style={{ fontSize: 20 }}>
              Opportunities
              <span>
                {!geoStoreId && (
                  <OpportunityCreatorComponent
                    studyAreaId={parseFloat(id as string)}
                  />
                )}
              </span>
            </p>
            {studyAreasConfig.opportunities &&
              studyAreasConfig.opportunities.map((i) => (
                <Box
                  sx={{
                    width: "90%",
                    color: "white",
                    padding: 1,
                    marginTop: 2,
                    border: "1px solid black",
                    borderRadius: 10
                  }}
                >
                  <Chip label={"ID: " + i.id} sx={{ margin: 1 }} />
                  <Chip
                    label={"Opportunity: " + i.opportunity_group_id}
                    sx={{ margin: 1 }}
                  />
                  <Chip label={"Category: " + i.category} sx={{ margin: 1 }} />
                  <Chip
                    label="View"
                    color="secondary"
                    onClick={() => setOpportunityData(i)}
                    sx={{ backgroundColor: "#2bb381" }}
                  />
                </Box>
              ))}
            {opportunityData && (
              <OpportunityViewerComponent
                opportunityData={opportunityData}
                modalClosed={() => {
                  location.reload();
                }}
              />
            )}
          </Box>
        </Box>
      </SimpleForm>
    </Edit>
  );
}
