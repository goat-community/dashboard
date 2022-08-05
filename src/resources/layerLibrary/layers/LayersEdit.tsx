import { useState } from "react";
import {
  SimpleForm,
  TextInput,
  useRedirect,
  Edit,
  Toolbar,
  SaveButton,
  DeleteButton,
  useEditController,
  useRecordContext
} from "react-admin";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { MapViewer, JSONEditor, ChipInput } from "@common";

const JSONViewer = (props: { jsonResource: string; onChange: any }) => {
  const { jsonResource, onChange } = props;
  const record = useRecordContext();
  return (
    <JSONEditor
      defaultValue={JSON.stringify(record[jsonResource], null, 2)}
      onChange={onChange}
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

const Map = () => {
  const record = useRecordContext();
  return <MapViewer mapType={record["type"]} mapURL={record["url"]} />;
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
  const { save } = useEditController();
  const redirect = useRedirect();
  const [specialAttribute, setSpecialAttribute] = useState<undefined | string>(
    undefined
  );
  const [lengendsURL, setLengendsURL] = useState<null | string[]>();

  const postSave = (data: any) => {
    const mixedData = {
      ...data,
      special_attribute:
        specialAttribute === undefined
          ? data.special_attribute
          : JSON.parse(specialAttribute),
      legened_urls:
        specialAttribute === undefined
          ? data.special_attribute
          : JSON.parse(specialAttribute)
    };

    save!({
      ...mixedData
    });
  };

  const mlStyle = { xs: 0, sm: "0.5em" };
  const mrStyle = { xs: 0, sm: "0.5em" };
  const displayStyle = { xs: "block", sm: "flex", width: "100%" };

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
        defaultValues={{
          legend_urls: []
        }}
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
            <TextInput source="type" fullWidth variant="outlined" />
          </Box>
        </Box>

        <Box display={displayStyle}>
          <Box flex={1}>
            <LegendsInput setLengendsURL={setLengendsURL} />
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

        <Box display={displayStyle} mt={5} sx={{ height: 400 }}>
          <Box flex={1}>
            <h3>Map preview</h3>
            <br />
            <Map />
          </Box>
        </Box>
      </SimpleForm>
    </Edit>
  );
}
