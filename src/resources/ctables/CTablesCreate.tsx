import { useState } from "react";
import {
  SimpleForm,
  TextInput,
  Create,
  useCreateController,
  Toolbar,
  SaveButton,
  LoadingIndicator
} from "react-admin";
import { Box, Typography } from "@mui/material";
import { JSONEditor } from "@common";
import { removeEmptyProperties } from "@utils";

export const validateForm = (v: Record<string, any>): Record<string, any> => {
  const errors = {} as any;
  if (!v.type) {
    errors.type = "type is required";
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

export default function CTablesCreate() {
  const { save, saving } = useCreateController({ resource: "ctables" });
  const [settings, setSettings] = useState<string>();
  const displayStyle = { xs: "block", sm: "flex", width: "100%" };

  const createLayer = (data: any) => {
    const mixedData = {
      ...removeEmptyProperties(data),
      setting: settings ? JSON.parse(settings) : {}
    };

    save!({
      ...removeEmptyProperties(mixedData)
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
        validate={validateForm}
        sx={{ width: 900 }}
        warnWhenUnsavedChanges
        onSubmit={createLayer}
        toolbar={<CustomToolbar loading={saving} />}
      >
        <Box display={displayStyle}>
          <Box flex={1}>
            <TextInput source="type" isRequired fullWidth variant="outlined" />
          </Box>
        </Box>
        <Box display={displayStyle}>
          <Box flex={1}>
            <TextInput
              source="role_id"
              defaultValue={0}
              fullWidth
              variant="outlined"
            />
          </Box>
        </Box>

        <Box>
          <Typography variant="h5">Setting</Typography>
        </Box>
        <Box display={displayStyle}>
          <JSONEditor
            onChange={(newSettings: string) => {
              setSettings(newSettings);
            }}
          />
        </Box>
      </SimpleForm>
    </Create>
  );
}
