import {
  SimpleForm,
  TextInput,
  useRedirect,
  Edit,
  Toolbar,
  SaveButton,
  DeleteButton,
  useEditController,
  useResourceContext,
  useEditContext,
  FileInput,
  FileField
} from "react-admin";
import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useParams } from "react-router-dom";

export const validateForm = (v: Record<string, any>): Record<string, any> => {
  const errors = {} as any;
  if (!v.name) {
    errors.name = "Layer name is required";
  }

  return errors;
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
  const { id } = useParams();
  const redirect = useRedirect();

  const postSave = (data: any) => {
    const mixedData = {
      ...data
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
      >
        <Box display={displayStyle}>
          <Box flex={1} mr={mrStyle}>
            <TextInput source="id" fullWidth variant="outlined" disabled />
          </Box>
          <Box flex={1} ml={mlStyle}>
            <TextInput
              source="creation_date"
              fullWidth
              variant="outlined"
              disabled
            />
          </Box>
        </Box>
        <Box display={displayStyle}>
          <Box flex={1} mr={mrStyle}>
            <TextInput source="user_id" fullWidth variant="outlined" disabled />
          </Box>
          <Box flex={1} ml={mlStyle}>
            <TextInput
              source="table_name"
              fullWidth
              variant="outlined"
              disabled
            />
          </Box>
        </Box>
        <Box display={displayStyle}>
          <Box flex={1} mr={mrStyle}>
            <FileInput
              source="upload_file"
              label="Upload File"
              accept="application/pdf"
            >
              <FileField source="src" title="title" />
            </FileInput>
          </Box>
        </Box>
      </SimpleForm>
    </Edit>
  );
}
