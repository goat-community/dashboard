import {
  Create,
  SimpleForm,
  TextInput,
  Toolbar,
  SaveButton,
  SelectInput
} from "react-admin";
import { Box, Typography } from "@mui/material";
import { PButton } from "@common";
import { backNavigate } from "@utils";

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
  if (!v.password) {
    errors.password = "Password required";
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

export default function UsersCreate() {
  return (
    <Create
      sx={{
        justifySelf: "center",
        display: "flex",
        alignSelf: "center"
      }}
    >
      <SimpleForm
        warnWhenUnsavedChanges
        toolbar={
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <PButton text="Discard" onClick={backNavigate} colors="error" />
            <SaveButton label="Create" />
          </Toolbar>
        }
        defaultValues={{
          name: "Sina",
          surname: "Farhadi",
          email: "sina@mail.com",
          password: "password",
          organization_id: 10,
          active_study_area_id: "10",
          active_data_upload_ids: [10],
          storage: 512000,
          limit_scenarios: 10,
          is_active: true,
          roles: null,
          newsletter: true,
          occupation: "",
          domain: "test",
          language_preference: "en"
        }}
        validate={validateForm}
      >
        <Typography variant="h6" gutterBottom>
          Creating new user
        </Typography>

        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="name" isRequired fullWidth />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="surname" isRequired fullWidth />
          </Box>
        </Box>

        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="email" isRequired fullWidth />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="password" isRequired fullWidth />
          </Box>
        </Box>

        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <SelectInput
              source="roles"
              fullWidth
              choices={[{ id: "user", name: "User" }]}
            />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="active_study_area_id" isRequired fullWidth />
          </Box>
        </Box>

        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <SelectInput
              source="newsletter"
              fullWidth
              choices={[
                { id: true, name: "Yes" },
                { id: false, name: "No" }
              ]}
            />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="organization_id" isRequired fullWidth />
          </Box>
        </Box>

        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="occupation" fullWidth />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="domain" fullWidth />
          </Box>
        </Box>

        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <SelectInput
              source="is_active"
              fullWidth
              choices={[
                { id: true, name: "Active" },
                { id: false, name: "Not active" }
              ]}
            />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="storage" isRequired fullWidth />
          </Box>
        </Box>

        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="limit_scenarios" isRequired fullWidth />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
            <SelectInput
              source="language_preference"
              fullWidth
              choices={[
                { id: "en", name: "en" },
                { id: "de", name: "de" }
              ]}
            />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="active_data_upload_ids" fullWidth />
          </Box>
        </Box>
      </SimpleForm>
    </Create>
  );
}
