import { useEffect } from "react";
import { batch } from "react-redux";
import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  SelectArrayInput
} from "react-admin";
import { Box, Typography } from "@mui/material";
import { getOrganizations } from "@context/organizations";
import { getStudyAreas } from "@context/user";
import { useAppDispatch, useAppSelector } from "@hooks";
import UserCreateToolbar from "./UserCreateToolbar";

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
  if (!v.limit_scenarios) {
    errors.limit_scenarios = "limit scenarios is required";
  }

  return errors;
};

export default function UsersCreate() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.network.loading);
  const organizations = useAppSelector((state) => state.organizations.organs);
  const studyAreas = useAppSelector((state) => state.user.studyAreas);

  // fetch organizations and study areas
  useEffect(() => {
    batch(() => {
      dispatch(getOrganizations());
      dispatch(getStudyAreas());
    });
  }, []);
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
          name: "",
          surname: "",
          email: "",
          password: "",
          roles: null,
          organization_id: null,
          active_study_area_id: null,
          storage: 512000,
          limit_scenarios: 50,
          is_active: true,
          newsletter: true,
          occupation: "",
          domain: "",
          language_preference: "de",
          active_data_upload_ids: []
        }}
        validate={validateForm}
      >
        <Typography variant="h6" gutterBottom>
          Creating new user
        </Typography>

        <Box display={displayStyle}>
          <Box flex={1} mr={mrStyle}>
            <TextInput source="name" isRequired fullWidth variant="outlined" />
          </Box>
          <Box flex={1} ml={mlStyle}>
            <TextInput
              source="surname"
              isRequired
              fullWidth
              variant="outlined"
            />
          </Box>
        </Box>

        <Box display={displayStyle}>
          <Box flex={1} mr={mrStyle}>
            <TextInput source="email" isRequired fullWidth variant="outlined" />
          </Box>
          <Box flex={1} ml={mlStyle}>
            <TextInput
              source="password"
              isRequired
              fullWidth
              variant="outlined"
            />
          </Box>
        </Box>

        <Box display={displayStyle}>
          <Box flex={1} mr={mrStyle}>
            <SelectArrayInput
              label="Roles"
              source="roles"
              choices={[{ id: "user", name: "user" }]}
              variant="outlined"
              sx={{ width: "100%" }}
            />
          </Box>
          <Box flex={1} ml={mlStyle}>
            <SelectInput
              source="active_study_area_id"
              emptyText={"Please select a study area"}
              isRequired
              fullWidth
              choices={
                loading ? [{ name: "Loading study areas..." }] : studyAreas
              }
              variant="outlined"
            />
          </Box>
        </Box>

        <Box display={displayStyle}>
          <Box flex={1} mr={mrStyle}>
            <SelectInput
              source="newsletter"
              emptyText={"Please select newsletter state"}
              fullWidth
              choices={[
                { id: true, name: "Yes" },
                { id: false, name: "No" }
              ]}
              variant="outlined"
            />
          </Box>
          <Box flex={1} ml={mlStyle}>
            <SelectInput
              source="organization_id"
              emptyText={"Please select an organization"}
              isRequired
              fullWidth
              choices={
                loading ? [{ name: "Loading organizations..." }] : organizations
              }
              variant="outlined"
            />
          </Box>
        </Box>

        <Box display={displayStyle}>
          <Box flex={1} mr={mrStyle}>
            <TextInput source="occupation" fullWidth variant="outlined" />
          </Box>
          <Box flex={1} ml={mlStyle}>
            <TextInput source="domain" fullWidth variant="outlined" />
          </Box>
        </Box>

        <Box display={displayStyle}>
          <Box flex={1} mr={mrStyle}>
            <SelectInput
              source="is_active"
              emptyText={"Please select an active status"}
              fullWidth
              choices={[
                { id: true, name: "Active" },
                { id: false, name: "Not active" }
              ]}
              variant="outlined"
            />
          </Box>
          <Box flex={1} ml={mlStyle}>
            <TextInput
              source="storage"
              isRequired
              fullWidth
              variant="outlined"
            />
          </Box>
        </Box>

        <Box display={displayStyle}>
          <Box flex={1} mr={mrStyle}>
            <TextInput
              source="limit_scenarios"
              isRequired
              fullWidth
              variant="outlined"
            />
          </Box>
          <Box flex={1} ml={mlStyle}>
            <SelectInput
              source="language_preference"
              emptyText={"Please select an language prefrense"}
              fullWidth
              choices={[
                { id: "en", name: "en" },
                { id: "de", name: "de" }
              ]}
              variant="outlined"
            />
          </Box>
        </Box>
      </SimpleForm>
    </Create>
  );
}
