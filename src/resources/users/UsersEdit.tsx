import { useEffect, useState } from "react";
import { batch } from "react-redux";
import {
  SimpleForm,
  TextInput,
  SelectInput,
  useRedirect,
  Edit,
  SelectArrayInput
} from "react-admin";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getOrganizations } from "@context/organizations";
import { getAllUserRoles, getStudyAreas } from "@context/user";
import { useAppDispatch, useAppSelector } from "@hooks/context";

import { StudyAreaPickerComponent } from "./components/study-area-selector";

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
  if (!v.roles) {
    errors.roles = "roles required";
  }
  if (!v.organization_id) {
    errors.organization_id = "organization id is required";
  }
  if (!v.active_study_area_id) {
    alert("active_study_area_id is required");
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

export default function UsersEdit() {
  const redirect = useRedirect();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.network.loading);
  const organizations = useAppSelector((state) => state.organizations.organs);
  const studyAreas = useAppSelector((state) => state.user.studyAreas);
  const globalUserRoles = useAppSelector((state) => state.user.globalUserRoles);
  const [pickedStudyAreas, setPickedStudyAreas] = useState<{
    activeStudyArea: number;
    pickedStudyAreas: number[];
  } | null>(null);

  // fetch organizations and study areas
  useEffect(() => {
    batch(() => {
      dispatch(getOrganizations());
      dispatch(getStudyAreas());
      dispatch(getAllUserRoles());
    });
  }, []);

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
      mutationMode="pessimistic"
    >
      <IconButton sx={{ margin: 1 }} onClick={() => redirect("..")}>
        <CloseIcon />
      </IconButton>

      <SimpleForm sx={{ width: 900 }} validate={validateForm}>
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
        </Box>

        <Box display={displayStyle}>
          <Box flex={1} mr={mrStyle}>
            <SelectArrayInput
              label="Roles"
              source="roles"
              choices={
                loading
                  ? [
                      { name: "superuser", id: 19 },
                      { name: "user", id: 20 }
                    ]
                  : globalUserRoles
              }
              optionValue="name"
              variant="outlined"
              sx={{ width: "100%" }}
            />
          </Box>
          <Box flex={1} ml={mlStyle}>
            <StudyAreaPickerComponent
              editMode
              sumbittedStudyAreas={(activeStudyArea, pickedStudyAreas) =>
                setPickedStudyAreas({
                  activeStudyArea: activeStudyArea,
                  pickedStudyAreas: pickedStudyAreas
                })
              }
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
    </Edit>
  );
}
