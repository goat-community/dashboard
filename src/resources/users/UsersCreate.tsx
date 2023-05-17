import { useEffect, useState } from "react";
import { batch } from "react-redux";
import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  useCreateController,
  Toolbar,
  LoadingIndicator,
  SaveButton,
  useNotify
} from "react-admin";
import { Box, Typography } from "@mui/material";
import { getOrganizations } from "@context/organizations";
import { getStudyAreas } from "@context/user";
import { useAppDispatch, useAppSelector } from "@hooks";

import { StudyAreaPickerComponent } from "./components/study-area-selector";
import { UserRolesPicker } from "./components/user-roles";
import { removeEmptyProperties } from "@utils";

const validateForm = (v: Record<string, any>): Record<string, any> => {
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
  if (!v.storage) {
    errors.storage = "storage is required";
  }
  if (!v.limit_scenarios) {
    errors.limit_scenarios = "limit scenarios is required";
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

export default function UsersCreate() {
  const { save, saving } = useCreateController({ resource: "users" });
  const notify = useNotify();
  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.network.loading);
  const organizations = useAppSelector((state) => state.organizations.organs);

  const [pickedRoles, setPickedRoles] = useState<
    { name: string; id: number }[] | []
  >([]);
  const [pickedStudyAreas, setPickedStudyAreas] = useState<{
    activeStudyArea: number;
    pickedStudyAreas: number[];
  } | null>(null);

  // fetch organizations and study areas
  useEffect(() => {
    batch(() => {
      dispatch(getOrganizations());
      dispatch(getStudyAreas());
    });
  }, []);

  const postSave = (data: any) => {
    if (!pickedStudyAreas) {
      notify("Please pick study areas", {
        type: "error"
      });
      return false;
    }

    if (!pickedRoles.length) {
      notify("Roles are required!", {
        type: "error"
      });
      return false;
    }

    let mixedData = {
      ...data,
      active_study_area_id: pickedStudyAreas.activeStudyArea,
      study_areas: pickedStudyAreas.pickedStudyAreas,
      roles: pickedRoles.map((i) => i.name)
    };

    save!(removeEmptyProperties(mixedData));
  };

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
        onSubmit={postSave}
        toolbar={<CustomToolbar loading={saving} />}
        validate={validateForm}
        defaultValues={{
          name: "",
          surname: "",
          email: "",
          password: "",
          roles: null,
          organization_id: null,
          storage: 512000,
          limit_scenarios: 50,
          is_active: true,
          newsletter: true,
          occupation: "",
          domain: "",
          language_preference: "de",
          active_data_upload_ids: []
        }}
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

        <Box display={displayStyle}>
          <Box flex={1} mr={mrStyle} mb={3}>
            <UserRolesPicker
              onPickRole={(roles) => setPickedRoles(roles as any)}
            />
          </Box>
          <Box flex={1} ml={mlStyle}>
            <StudyAreaPickerComponent
              sumbittedStudyAreas={(activeStudyArea, pickedStudyAreas) =>
                setPickedStudyAreas({
                  activeStudyArea: activeStudyArea,
                  pickedStudyAreas: pickedStudyAreas
                })
              }
            />
          </Box>
        </Box>
      </SimpleForm>
    </Create>
  );
}
