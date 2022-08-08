import { useEffect, useState } from "react";
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
  layerStyles: LayerStyle[];
}) => {
  const record = useRecordContext();
  const available_records = ["XYZ", "WMS", "MVT"];
  const { layerURL, layerStyles } = props;

  if (available_records.includes(record["type"])) {
    return (
      <Box display={displayStyle} mt={5} sx={{ height: 400 }}>
        <Box flex={1}>
          <h3>Map preview</h3>
          <br />
          <MapViewer
            layerType={record["type"]}
            layerURL={layerURL !== undefined ? layerURL : record["url"]}
            layerName={record["name"]}
            mapAttribution={record["map_attribution"]}
            layerStyle={
              layerStyles &&
              layerStyles.find(
                (ls: LayerStyle) => ls.name === record["style_library_name"]
              )
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
  const [legendsURL, setLengendsURL] = useState<null | string[]>();
  const layerStyles = useAppSelector((state) => state.layerStyles.layerStyles);
  const [mapURL, setMapURL] = useState<string | undefined>(undefined);
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
      legened_urls: legendsURL === undefined ? data.legends_url : legendsURL
    };

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
              choices={layerStyles}
              variant="outlined"
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
        <Map layerStyles={layerStyles} layerURL={mapURL} />
      </SimpleForm>
    </Edit>
  );
}
