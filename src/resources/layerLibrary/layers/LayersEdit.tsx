import { ChangeEvent, useEffect, useState } from "react";
import {
  SimpleForm,
  TextInput,
  useRedirect,
  Edit,
  Toolbar,
  SaveButton,
  DeleteButton,
  useEditController,
  useRecordContext,
  SelectInput
} from "react-admin";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getLayersStyles } from "@context/layerStyles";
import { MapViewer, JSONEditor, ChipInput } from "@common";
import { useAppDispatch, useAppSelector } from "@hooks";
import type { LayerStyle } from "@types";
import { batch } from "react-redux";
import { getExtraLayers } from "@context/extraLayers";

const mlStyle = { xs: 0, sm: "0.5em" };
const mrStyle = { xs: 0, sm: "0.5em" };
const displayStyle = { xs: "block", sm: "flex", width: "100%" };

const validateForm = (v: Record<string, any>): Record<string, any> => {
  const errors = {} as any;
  // validate layers edit form
  if (!v.name) {
    errors.name = "Name is required";
  }
  if (!v.source) {
    errors.source = "Source is required";
  }
  if (!v.type) {
    errors.type = "Layer type is required";
  }
  if (v.type === "MVT" && !v.style_library_name) {
    errors.style_library_name = "Style library name is required";
  }
  if (v.type === "XYZ" && !v.url) {
    errors.url = "URL is required";
  }
  if (v.type === "WMS" && !v.url) {
    errors.url = "URL is required";
  }

  return errors;
};

const JSONViewer = (props: { jsonResource: string; onChange: any }) => {
  const { jsonResource, onChange } = props;
  const record = useRecordContext();
  return (
    <JSONEditor
      defaultValue={JSON.stringify(record[jsonResource], null, 2)}
      onChange={onChange}
      height="60px"
    />
  );
};

const CustomToolbar = (props: any) => {
  return (
    <Toolbar
      {...props}
      sx={{ display: "flex", justifyContent: "space-between" }}
    >
      <SaveButton alwaysEnable />
      <DeleteButton mutationMode="pessimistic" />
    </Toolbar>
  );
};

const Map = (props: {
  layerURL: string | undefined;
  layerType: undefined | "WMS" | "XYZ" | "MVT";
  layerStyles: LayerStyle[];
  customLayerStyle: LayerStyle | undefined;
}) => {
  const record = useRecordContext();
  const available_records = ["XYZ", "WMS", "MVT"];
  const { layerURL, layerStyles, customLayerStyle, layerType } = props;

  if (available_records.includes(record["type"])) {
    return (
      <Box display={displayStyle} mt={5} sx={{ height: 400 }}>
        <Box flex={1}>
          <h3>Map preview</h3>
          <br />
          <MapViewer
            layerType={layerType === undefined ? record["type"] : layerType}
            layerURL={layerURL !== undefined ? layerURL : record["url"]}
            layerName={record["name"]}
            mapAttribution={record["map_attribution"]}
            layerStyle={
              layerStyles && !customLayerStyle
                ? layerStyles.find(
                    (ls: LayerStyle) => ls.name === record["style_library_name"]
                  )
                : customLayerStyle
            }
          />
        </Box>
      </Box>
    );
  }

  return <></>;
};

const LegendsInput = (props: any) => {
  const record = useRecordContext();
  return (
    <ChipInput
      label="Legend URL's"
      onChange={(urls) => props.setLengendsURL(urls)}
      defaultValue={record["legend_urls"]}
    />
  );
};

export default function LayersEdit() {
  const dispatch = useAppDispatch();
  const { save } = useEditController();
  const redirect = useRedirect();
  const layerStyles = useAppSelector((state) => state.layerStyles.layerStyles);
  const extraLayers = useAppSelector((state) => state.extraLayers.extraLayers);

  const [legendsURL, setLengendsURL] = useState<null | string[]>();
  const [mapURL, setMapURL] = useState<string | undefined>(undefined);
  const [layerType, setLayerType] = useState<undefined | "WMS" | "XYZ" | "MVT">(
    undefined
  );
  const [layerStyle, setLayerStyle] = useState<LayerStyle | undefined>(
    undefined
  );
  const [specialAttribute, setSpecialAttribute] = useState<undefined | string>(
    undefined
  );

  useEffect(() => {
    batch(() => {
      dispatch(getLayersStyles());
      dispatch(getExtraLayers());
    });
  }, []);

  const postSave = (data: any) => {
    let mixedData = {
      ...data,
      special_attribute:
        specialAttribute === undefined
          ? data.special_attribute
          : JSON.parse(specialAttribute),
      legend_urls: legendsURL === undefined ? data.legend_urls : legendsURL,
      style_library_name:
        layerStyle === undefined ? data.style_library_name : layerStyle.name
    };

    if (
      data.type === "WMS" &&
      !legendsURL?.length &&
      !data.legend_urls?.length
    ) {
      alert("Legend URLs is required for WMS layers");
      return false;
    }

    if (mixedData.source_1 === "") {
      mixedData = Object.fromEntries(
        Object.entries(mixedData).filter(([key, _]) => key !== "source_1")
      );
    }

    if (mixedData.style_library_name === "") {
      mixedData = Object.fromEntries(
        Object.entries(mixedData).filter(
          ([key, _]) => key !== "style_library_name"
        )
      );
    }

    save!({
      ...mixedData
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
        toolbar={<CustomToolbar />}
        onSubmit={postSave}
        onChange={(e: any) => {
          if (e.target.name === "url") {
            // ovserve map url update
            setMapURL(e.target.value);
          }
        }}
        defaultValues={{
          legend_urls: []
        }}
        validate={validateForm}
      >
        <Box display={displayStyle}>
          <Box flex={1} mr={mrStyle}>
            <SelectInput
              source="type"
              emptyText={"Select an layer type"}
              fullWidth
              isRequired
              choices={[
                { id: "MVT", name: "MVT" },
                { id: "WMS", name: "WMS" },
                { id: "XYZ", name: "XYZ" }
              ]}
              onChange={(e: any) => {
                setLayerType(e.target.value);
              }}
              variant="outlined"
            />
          </Box>
          <Box flex={1} ml={mlStyle}>
            {layerType === "MVT" || !layerType ? (
              <SelectInput
                source="name"
                emptyText={"Select a extra layer"}
                fullWidth
                choices={extraLayers}
                variant="outlined"
                optionValue="table_name"
                optionText="table_name"
              />
            ) : (
              <TextInput
                source="name"
                isRequired
                fullWidth
                variant="outlined"
              />
            )}
          </Box>
        </Box>

        <Box display={displayStyle}>
          <Box flex={1} mr={mrStyle}>
            <TextInput source="url" fullWidth variant="outlined" />
          </Box>
          <Box flex={1} ml={mlStyle}>
            <TextInput source="map_attribution" fullWidth variant="outlined" />
          </Box>
        </Box>

        <Box display={displayStyle}>
          <Box flex={1} mr={mrStyle}>
            <SelectInput
              source="source"
              variant="outlined"
              fullWidth
              isRequired
              choices={[
                { id: 1, name: "Stadt Freiburg (FreiGIS)" },
                { id: 2, name: "Bayerisches Landesamt für Umwelt" },
                { id: 3, name: "Datenbestände des ATKIS Basis-DLM der Länder" },
                { id: 4, name: "Statistischen Ämter des Bundes und der Länder" }
              ]}
              optionValue="name"
            />
          </Box>
          <Box flex={1} ml={mlStyle}>
            <SelectInput
              source="source_1"
              variant="outlined"
              fullWidth
              isRequired
              choices={[
                { id: 1, name: "Stadt Freiburg (FreiGIS)" },
                { id: 2, name: "Bayerisches Landesamt für Umwelt" },
                { id: 3, name: "Datenbestände des ATKIS Basis-DLM der Länder" },
                { id: 4, name: "Statistischen Ämter des Bundes und der Länder" }
              ]}
              optionValue="name"
            />
          </Box>
        </Box>

        <Box display={displayStyle}>
          <Box flex={1} mr={mrStyle}>
            <TextInput source="date" fullWidth variant="outlined" />
          </Box>
          <Box flex={1} ml={mlStyle}>
            <TextInput source="date_1" fullWidth variant="outlined" />
          </Box>
        </Box>

        <Box display={displayStyle}>
          <Box flex={1} mr={mrStyle}>
            <TextInput source="max_resolution" fullWidth variant="outlined" />
          </Box>
          <Box flex={1} ml={mlStyle}>
            <TextInput source="min_resolution" fullWidth variant="outlined" />
          </Box>
          <Box flex={1} ml={mlStyle}>
            <Box flex={1} mr={mrStyle}>
              <TextInput source="access_token" fullWidth variant="outlined" />
            </Box>
          </Box>
        </Box>

        <Box display={displayStyle}>
          <Box flex={1} mr={mrStyle}>
            <LegendsInput setLengendsURL={setLengendsURL} />
          </Box>
          <Box flex={1} ml={mlStyle}>
            <SelectInput
              source="style_library_name"
              emptyText={"Select an style library name"}
              fullWidth
              choices={layerStyles}
              variant="outlined"
              disabled={
                layerType === "WMS" || layerType === "XYZ" || !layerType
              }
              onChange={(e: any) => {
                const styleLibrary = layerStyles.find(
                  (style) => style.name === e.target.value
                );
                setLayerStyle(styleLibrary);
              }}
            />
          </Box>
        </Box>

        <Box display={displayStyle} mt={6}>
          <Box flex={1}>
            <h3>Special Attributes</h3>
            <br />
            <JSONViewer
              jsonResource="special_attribute"
              onChange={(special_attributes: string) => {
                setSpecialAttribute(special_attributes);
              }}
            />
          </Box>
        </Box>
        <Map
          layerStyles={layerStyles}
          layerURL={mapURL}
          layerType={layerType}
          customLayerStyle={layerStyle}
        />
      </SimpleForm>
    </Edit>
  );
}
