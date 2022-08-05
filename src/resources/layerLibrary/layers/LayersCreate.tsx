import { useState } from "react";
import {
  SimpleForm,
  TextInput,
  Toolbar,
  SaveButton,
  DeleteButton,
  Create,
  useCreateController,
  SelectInput
} from "react-admin";
import { Box } from "@mui/material";
import { MapViewer, JSONEditor, ChipInput } from "@common";

const mlStyle = { xs: 0, sm: "0.5em" };
const mrStyle = { xs: 0, sm: "0.5em" };
const displayStyle = { xs: "block", sm: "flex", width: "100%" };

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

const LegendsInput = (props: any) => {
  return (
    <ChipInput
      label="Legend URL's"
      onChange={(urls) => props.setLengendsURL(urls)}
    />
  );
};

export default function LayersCreate() {
  const { save } = useCreateController();
  const [legendsURL, setLengendsURL] = useState<null | string[]>();
  const [mapURL, setMapURL] = useState<null | string>();
  const [mapType, setMapType] = useState<"XYZ" | "WMS" | null>();
  const [specialAttribute, setSpecialAttribute] = useState<undefined | string>(
    undefined
  );

  const postSave = (data: any) => {
    const mixedData = {
      ...data,
      special_attribute:
        specialAttribute === undefined
          ? data.special_attribute
          : JSON.parse(specialAttribute),
      legened_urls: legendsURL === undefined ? data.legends_url : legendsURL
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
        toolbar={<CustomToolbar />}
        onSubmit={postSave}
        defaultValues={{
          legend_urls: [],
          special_attribute: {},
          type: ["XYZ", "WMS"]
        }}
      >
        <Box display={displayStyle}>
          <Box flex={1} mr={mrStyle}>
            <TextInput source="name" isRequired fullWidth variant="outlined" />
          </Box>
          <Box flex={1} ml={mlStyle}>
            <TextInput
              source="url"
              fullWidth
              variant="outlined"
              onChange={(e) => setMapURL(e.target.value)}
            />
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
            <TextInput source="source" fullWidth variant="outlined" />
          </Box>
          <Box flex={1} ml={mlStyle}>
            <TextInput source="source_1" fullWidth variant="outlined" />
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
              emptyText={"Please select a layer type"}
              isRequired
              fullWidth
              choices={[
                { id: "XYZ", name: "XYZ" },
                { id: "WMS", name: "WMS" }
              ]}
              variant="outlined"
              onChange={(e) => setMapType(e.target.value)}
            />
          </Box>
        </Box>

        <Box display={displayStyle}>
          <Box flex={1} mr={mrStyle}>
            <LegendsInput setLengendsURL={setLengendsURL} />
          </Box>
          <Box flex={1} ml={mlStyle}>
            <TextInput
              source="style_library_name"
              fullWidth
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
            />
          </Box>
        </Box>

        <Box display={displayStyle} mt={5} sx={{ height: 400 }}>
          {["XYZ", "WMS"].includes(mapType!) && mapURL ? (
            <Box flex={1}>
              <h3>Map preview</h3>
              <br />
              <MapViewer mapType={mapType!} mapURL={mapURL!} />
            </Box>
          ) : (
            <h4>Please fill the layer URL and layer type to preview in map</h4>
          )}
        </Box>
      </SimpleForm>
    </Create>
  );
}
