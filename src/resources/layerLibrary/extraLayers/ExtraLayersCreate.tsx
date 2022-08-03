import {
  SimpleForm,
  TextInput,
  useRedirect,
  Edit,
  Toolbar,
  SaveButton,
  DeleteButton,
  useEditController,
  FileInput,
  FileField,
  Create
} from "react-admin";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const validateForm = (v: Record<string, any>): Record<string, any> => {
  const errors = {} as any;
  if (!v.upload_file) {
    errors.upload_file = "File is required";
  }

  return errors;
};

export default function LayersCreate() {
  const displayStyle = { xs: "block", sm: "flex", width: "100%" };

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
      >
        <Box display={displayStyle}>
          <FileInput
            source="upload_file"
            label="Upload File"
            accept=".zip,.geojson,.gpkg"
          >
            <FileField source="src" title="title" />
          </FileInput>
        </Box>
      </SimpleForm>
    </Create>
  );
}
