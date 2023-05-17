import { useState } from "react";
import {
  SimpleForm,
  TextInput,
  useRedirect,
  Edit,
  useRecordContext,
  Toolbar,
  SaveButton,
  DeleteButton,
  useEditController
} from "react-admin";
import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { JSONEditor } from "@common";
import { removeEmptyProperties } from "@utils";

export const validateForm = (v: Record<string, any>): Record<string, any> => {
  const errors = {} as any;
  if (!v.name) {
    errors.name = "Layer name is required";
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

export default function LayersEdit() {
  const { save } = useEditController();
  const redirect = useRedirect();
  const [setting, setSettings] = useState<undefined | string>(undefined);

  const postSave = (data: any) => {
    const mixedData = {
      ...data,
      setting: setting === undefined ? data.setting : JSON.parse(setting)
    };

    save!({
      ...removeEmptyProperties(mixedData)
    });
  };

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
              isRequired
              fullWidth
              variant="outlined"
            />
          </Box>
        </Box>
        <Box>
          <Typography variant="h5">Setting</Typography>
        </Box>
        <br />
        <Box display={displayStyle}>
          <JSONViewer
            jsonResource="setting"
            onChange={(setting: string) => {
              setSettings(setting);
            }}
          />
        </Box>
      </SimpleForm>
    </Edit>
  );
}
