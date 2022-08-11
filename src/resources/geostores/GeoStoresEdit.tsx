import { useState } from "react";
import {
  SimpleForm,
  TextInput,
  SelectInput,
  useRedirect,
  Edit,
  useRecordContext,
  Toolbar,
  LoadingIndicator,
  SaveButton,
  useEditController,
  DeleteButton
} from "react-admin";
import { Box, IconButton, Typography, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { GeoStore } from "@types";

export const validateForm = (v: Record<string, any>): Record<string, any> => {
  const errors = {} as any;
  if (!v.name) {
    errors.name = "Name is required";
  }
  if (!v.type) {
    errors.type = "type is required";
  }
  if (!v.attribution) {
    errors.attribution = "attribution is required";
  }
  if (!v.url) {
    errors.url = "url is required";
  }
  if (!v.thumbnail_url) {
    errors.thumbnail_url = "Thumbnail is required";
  }

  return errors;
};

function ConfigurationForm(props: {
  onChange: (conf: GeoStore["configuration"] | {}) => void;
}) {
  const record = useRecordContext();
  const [configuration, setConfiguration] = useState<
    GeoStore["configuration"] | {}
  >(record?.configuration || {});

  return (
    <>
      {[
        "url",
        "name",
        "description",
        "type",
        "legend",
        "attribution",
        "getcapabilities"
      ].map((i: string) => (
        <TextField
          key={i}
          // @ts-ignore
          value={configuration?.[i]}
          onChange={(e) => {
            //@ts-ignore
            let new_configuration: GeoStore["configuration"] = {
              ...configuration,
              [i]: e.target.value
            };
            setConfiguration(new_configuration);
            props.onChange(new_configuration);
          }}
          label={i}
          fullWidth
          variant="outlined"
        />
      ))}
    </>
  );
}

const CustomToolbar = (props: any) => {
  return (
    <Toolbar
      {...props}
      sx={{ display: "flex", justifyContent: "space-between" }}
    >
      {props.loading && <LoadingIndicator />}
      {!props.loading && <SaveButton alwaysEnable />}
      <DeleteButton />
    </Toolbar>
  );
};

export default function GeoStoresEdit() {
  const redirect = useRedirect();
  const { save, saving } = useEditController();
  const [configuration, setConfiguration] = useState<
    GeoStore["configuration"] | {}
  >({});

  const mlStyle = { xs: 0, sm: "0.5em" };
  const mrStyle = { xs: 0, sm: "0.5em" };
  const displayStyle = { xs: "block", sm: "flex", width: "100%" };

  const postSave = (data: any) => {
    let new_configuration: {
      [key: string]: string;
    } = {};

    [
      "url",
      "name",
      "description",
      "type",
      "legend",
      "attribution",
      "getcapabilities"
      // @ts-ignore
    ].map((i: any) => (new_configuration[i] = configuration[i] || ""));

    save!({
      ...data,
      configuration: { ...new_configuration }
    });
  };

  return (
    <Edit
      sx={{
        justifySelf: "center",
        display: "flex",
        alignSelf: "center"
      }}
      mutationMode="pessimistic"
    >
      <IconButton sx={{ margin: 1 }} onClick={() => redirect("..")}>
        <CloseIcon />
      </IconButton>

      <SimpleForm
        sx={{ width: 900 }}
        validate={validateForm}
        onSubmit={postSave}
        toolbar={<CustomToolbar loading={saving} />}
      >
        <Box display={displayStyle}>
          <Box flex={1} mr={mrStyle}>
            <TextInput source="name" isRequired fullWidth variant="outlined" />
          </Box>
          <Box flex={1} ml={mlStyle}>
            <TextInput source="url" isRequired fullWidth variant="outlined" />
          </Box>
        </Box>

        <Box display={displayStyle}>
          <Box flex={1} mr={mrStyle}>
            <SelectInput
              source="type"
              variant="outlined"
              fullWidth
              isRequired
              choices={[
                { id: "geoadmin", name: "geoadmin" },
                { id: "other", name: "other" }
              ]}
              optionValue="name"
            />
          </Box>
          <Box flex={1} ml={mlStyle}>
            <TextInput
              source="attribution"
              isRequired
              fullWidth
              variant="outlined"
            />
          </Box>
        </Box>
        <Box display={displayStyle}>
          <Box flex={1}>
            <TextInput
              source="thumbnail_url"
              isRequired
              fullWidth
              variant="outlined"
            />
          </Box>
        </Box>

        <br />

        <Box display={displayStyle}>
          <Box flex={0.3}>
            <Typography variant="h6" gutterBottom>
              Configuration {"{...}"}
            </Typography>
          </Box>
          <Box flex={1}>
            <ConfigurationForm
              onChange={(conf: GeoStore["configuration"] | {}) =>
                setConfiguration(conf)
              }
            />
          </Box>
        </Box>
      </SimpleForm>
    </Edit>
  );
}
