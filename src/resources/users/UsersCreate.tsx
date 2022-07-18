import {
  Create,
  SimpleForm,
  TextInput,
  Toolbar,
  SaveButton,
  SelectInput,
  useRedirect,
  useNotify
} from "react-admin";
import { Box, Typography } from "@mui/material";
import { PButton } from "@common";

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

const UserCreateToolbar = () => {
  const redirect = useRedirect();
  const notify = useNotify();
  return (
    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
      <PButton text="Cancel" onClick={() => redirect("..")} colors="error" />
      <SaveButton
        icon={<></>}
        label="Create"
        mutationOptions={{
          onSuccess: () => {
            notify("User created successfully", {
              type: "success",
              messageArgs: { smart_count: 1 }
            });
            redirect("..");
          },
          onError(error: any) {
            notify(error?.response?.data?.detail, { type: "error" });
          }
        }}
        type="button"
      />
    </Toolbar>
  );
};

export default function UsersCreate() {
  const mlStyle = { xs: 0, sm: "0.5em" };
  const mrStyle = { xs: 0, sm: "0.5em" };
  const displayStyle = { xs: "block", sm: "flex", width: "100%" };

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
        warnWhenUnsavedChanges
        toolbar={<UserCreateToolbar />}
        defaultValues={{
          name: "Sina",
          surname: "Farhadi",
          email: "sina@mail.com",
          password: "password",
          roles: ["user"],
          organization_id: 4,
          active_study_area_id: 91620000,
          active_data_upload_ids: [],
          storage: 512000,
          limit_scenarios: 50,
          is_active: true,
          newsletter: true,
          occupation: "",
          domain: "test",
          language_preference: "de"
        }}
        validate={validateForm}
      >
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
          <Box flex={1} ml={mlStyle}>
            <TextInput source="password" isRequired fullWidth />
          </Box>
        </Box>

        <Box display={displayStyle}>
          <Box flex={1} mr={mrStyle}>
            <SelectInput
              source="roles"
              fullWidth
              choices={[{ id: "user", name: "User" }]}
            />
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
    </Create>
  );
}
