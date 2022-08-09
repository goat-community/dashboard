import { useEffect, useState } from "react";
import {
  SimpleForm,
  TextInput,
  Toolbar,
  SaveButton,
  SelectInput,
  Create,
  useCreateController,
  LoadingIndicator
} from "react-admin";
import { Box } from "@mui/material";
import { getLayersStyles } from "@context/layerStyles";
import { MapViewer, JSONEditor, ChipInput } from "@common";
import { useAppDispatch, useAppSelector } from "@hooks";
import { LayerStyle } from "@types";

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
  if (!v.source_1) {
    errors.source_1 = "Source 1 is required";
  }
  if (!v.type) {
    errors.type = "Layer type is required";
  }
  if (!v.style_library_name) {
    errors.style_library_name = "Style library name is required";
  }
  if (v.type === "WMS" && !v.legend_urls) {
    errors.legend_urls = "Legend URLs is required";
  }

  return errors;
};

const CustomToolbar = (props: any) => {
  return (
    <Toolbar
      {...props}
      sx={{ display: "flex", justifyContent: "space-between" }}
    >
      {props.loading && <LoadingIndicator />}
      {!props.loading && <SaveButton />}
    </Toolbar>
  );
};

const Map = (props: {
  layerURL: string;
  layerType: "XYZ" | "MVT" | "WMS" | "";
  layerStyle: LayerStyle | undefined;
  layerName: string;
}) => {
  const available_types = ["XYZ", "WMS", "MVT"];
  const { layerURL, layerType, layerName, layerStyle } = props;

  if (available_types.includes(layerType) && layerType !== "") {
    return (
      <Box display={displayStyle} mt={5} sx={{ height: 400 }}>
        <Box flex={1}>
          <h3>Map preview</h3>
          <br />
          <MapViewer
            layerType={layerType}
            layerURL={layerURL}
            layerName={layerName}
            mapAttribution={undefined}
            layerStyle={layerStyle}
          />
        </Box>
      </Box>
    );
  }

  return <></>;
};

const LegendsInput = (props: any) => {
  return (
    <ChipInput
      label="Legend URL's"
      onChange={(urls) => props.setLengendsURL(urls)}
    />
  );
};

export default function LayersEdit() {
  const { save, saving } = useCreateController({ resource: "layers" });
  const dispatch = useAppDispatch();
  const [legendURL, setLengendsURL] = useState<null | string[]>();
  const layerStyles = useAppSelector((state) => state.layerStyles.layerStyles);
  const [mapURL, setMapURL] = useState<string>("");
  const [layerType, setLayerType] = useState<"WMS" | "XYZ" | "MVT" | "">("");
  const [layerName, setLayerName] = useState<string>("");
  const [layerStyle, setLayerStyle] = useState<LayerStyle | undefined>(
    undefined
  );
  const [specialAttribute, setSpecialAttribute] = useState<undefined | string>(
    undefined
  );

  useEffect(() => {
    dispatch(getLayersStyles());
  }, []);

  const postSave = (data: any) => {
    const mixedData = {
      ...data,
      special_attribute:
        specialAttribute === undefined
          ? data.special_attribute
          : JSON.parse(specialAttribute),
      legend_urls: legendURL === undefined ? data.legend_urls : legendURL,
      style_library_name:
        layerStyle === undefined ? data.style_library_name : layerStyle.name
    };

    save!({
      ...mixedData
    });
  };

  return (
    <Create
      sx={{
        justifySelf: "center",
        display: "flex",
        alignSelf: "center"
      }}
      redirect="list"
    >
      <SimpleForm
        noValidate
        sx={{ width: 900 }}
        warnWhenUnsavedChanges
        toolbar={<CustomToolbar loading={saving} />}
        onSubmit={postSave}
        onChange={(e: any) => {
          if (e.target.name === "url") {
            setMapURL(e.target.value);
          }
          if (e.target.name === "name") {
            setLayerName(e.target.value);
          }
        }}
        defaultValues={{
          legend_urls: []
        }}
        validate={validateForm}
      >
        <Box display={displayStyle}>
          <Box flex={1} mr={mrStyle}>
            <TextInput source="name" isRequired fullWidth variant="outlined" />
          </Box>
          <Box flex={1} ml={mlStyle}>
            <TextInput source="url" fullWidth variant="outlined" />
          </Box>
        </Box>

        <Box display={displayStyle}>
          <Box flex={1} mr={mrStyle}>
            <TextInput source="access_token" fullWidth variant="outlined" />
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
              onChange={(e) => setLayerType(e.target.value)}
              optionValue="name"
              variant="outlined"
            />
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
              isRequired
              choices={layerStyles}
              onChange={(e) =>
                setLayerStyle(
                  layerStyles.find((s) => s.name === e.target.value)
                )
              }
              variant="outlined"
            />
          </Box>
        </Box>

        <Box display={displayStyle} mt={6}>
          <Box flex={1}>
            <h3>Special Attributes</h3>
            <br />
            <JSONEditor
              onChange={(special_attributes: string) => {
                setSpecialAttribute(special_attributes);
              }}
              height="60px"
            />
          </Box>
        </Box>
        <Map
          layerType={layerType}
          layerURL={mapURL}
          layerName={layerName}
          layerStyle={layerStyle}
        />
      </SimpleForm>
    </Create>
  );
}
