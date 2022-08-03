import {
  SimpleForm,
  TextInput,
  useRedirect,
  Edit,
  Toolbar,
  SaveButton,
  DeleteButton,
  useEditController
} from "react-admin";
import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
      <p>CRUD not available yet!</p>
      {/* <SaveButton alwaysEnable /> */}
      {/* <DeleteButton mutationMode="pessimistic" /> */}
    </Toolbar>
  );
};

export default function LayersEdit() {
  const { save } = useEditController();
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
            <TextInput
              source="name"
              isRequired
              fullWidth
              variant="outlined"
              disabled
            />
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
          <Box flex={1} mr={mrStyle}>
            <TextInput source="legend_urls" fullWidth variant="outlined" />
          </Box>
          <Box flex={1} ml={mlStyle}>
            <TextInput
              source="special_attribute"
              fullWidth
              variant="outlined"
            />
          </Box>
        </Box>
      </SimpleForm>
    </Edit>
  );
}
