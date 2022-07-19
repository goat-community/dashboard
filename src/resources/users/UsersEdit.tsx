import {
  SimpleForm,
  TextInput,
  SelectInput,
  useRedirect,
  Edit
} from "react-admin";
import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const validateForm = (v: Record<string, any>): Record<string, any> => {
  const errors = {} as any;
  if (!v.surname) {
    errors.surname = "Surname is required";
  }
  if (!v.name) {
    errors.Name = "Name is required";
  }
  if (!v.email) {
    errors.email = "Email required";
  }
  if (!v.organization_id) {
    errors.organization_id = "organization id is required";
  }
  if (!v.active_study_area_id) {
    errors.active_study_area_id = "active_study_area_id is required";
  }
  if (!v.storage) {
    errors.storage = "storage is required";
  }
  if (!v.active_study_area_id) {
    errors.active_study_area_id = "active study area id is required";
  }
  if (!v.limit_scenarios) {
    errors.limit_scenarios = "limit scenarios is required";
  }

  return errors;
};

export default function UsersEdit() {
  const redirect = useRedirect();
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

      <SimpleForm sx={{ width: 900 }}>
        <Typography variant="h6" gutterBottom>
          Creating new user
        </Typography>

        <Box display={displayStyle}>
          <Box flex={1} mr={mrStyle}>
            <TextInput source="name" isRequired fullWidth />
          </Box>
          <Box flex={1} ml={mlStyle}>
            <TextInput source="surname" isRequired fullWidth />
          </Box>
        </Box>

        <Box display={displayStyle}>
          <Box flex={1} mr={mrStyle}>
            <TextInput source="email" isRequired fullWidth />
          </Box>
        </Box>

        <Box display={displayStyle}>
          <Box flex={1} mr={mrStyle}>
            <TextInput source="roles" value={[]} defaultValue={[]} />
          </Box>
          <Box flex={1} ml={mlStyle}>
            <TextInput source="active_study_area_id" isRequired fullWidth />
          </Box>
        </Box>

        <Box display={displayStyle}>
          <Box flex={1} mr={mrStyle}>
            <SelectInput
              source="newsletter"
              fullWidth
              choices={[
                { id: true, name: "Yes" },
                { id: false, name: "No" }
              ]}
            />
          </Box>
          <Box flex={1} ml={mlStyle}>
            <TextInput source="organization_id" isRequired fullWidth />
          </Box>
        </Box>

        <Box display={displayStyle}>
          <Box flex={1} mr={mrStyle}>
            <TextInput source="occupation" fullWidth />
          </Box>
          <Box flex={1} ml={mlStyle}>
            <TextInput source="domain" fullWidth />
          </Box>
        </Box>

        <Box display={displayStyle}>
          <Box flex={1} mr={mrStyle}>
            <SelectInput
              source="is_active"
              fullWidth
              choices={[
                { id: true, name: "Active" },
                { id: false, name: "Not active" }
              ]}
            />
          </Box>
          <Box flex={1} ml={mlStyle}>
            <TextInput source="storage" isRequired fullWidth />
          </Box>
        </Box>

        <Box display={displayStyle}>
          <Box flex={1} mr={mrStyle}>
            <TextInput source="limit_scenarios" isRequired fullWidth />
          </Box>
          <Box flex={1} ml={mlStyle}>
            <SelectInput
              source="language_preference"
              fullWidth
              choices={[
                { id: "en", name: "en" },
                { id: "de", name: "de" }
              ]}
            />
          </Box>
          <Box flex={1} ml={mlStyle}>
            <TextInput source="active_data_upload_ids" fullWidth />
          </Box>
        </Box>
      </SimpleForm>
    </Edit>
  );
}
