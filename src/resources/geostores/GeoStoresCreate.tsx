import { useState } from "react";
import {
  Toolbar,
  LoadingIndicator,
  SaveButton,
  useCreateController,
  Create,
  SimpleForm,
  TextInput,
  SelectInput
} from "react-admin";
import { Box, TextField, Typography } from "@mui/material";
import type { GeoStore } from "@types";
import { removeEmptyProperties } from "@utils";

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
  const [configuration, setConfiguration] = useState<
    GeoStore["configuration"] | {}
  >({});

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
    </Toolbar>
  );
};

export default function GeoStoresCreate() {
  const { save, saving } = useCreateController({ resource: "geostores" });
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
      ...removeEmptyProperties(data),
      configuration: { ...removeEmptyProperties(new_configuration) }
    });
  };

  return (
    <Create
      sx={{
        justifySelf: "center",
        display: "flex",
        alignSelf: "center"
      }}
    >
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
    </Create>
  );
}
