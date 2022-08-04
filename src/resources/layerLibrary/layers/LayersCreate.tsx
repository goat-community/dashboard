import { useEffect } from "react";
import {
  SimpleForm,
  TextInput,
  SelectArrayInput,
  Create,
  SelectInput
} from "react-admin";
import { batch } from "react-redux";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@hooks";
import { getLayersStyles } from "@context/layerStyles";
import { getExtraLayers } from "@context/extraLayers";

export const validateForm = (v: Record<string, any>): Record<string, any> => {
  const errors = {} as any;
  if (!v.name) {
    errors.name = "Layer name is required";
  }

  return errors;
};

export default function LayersCreate() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.network.loading);
  const layerStylesList = useAppSelector(
    (state) => state.layerStyles.layerStyles
  );
  const extraLayersList = useAppSelector(
    (state) => state.extraLayers.extraLayers
  );

  useEffect(() => {
    batch(() => {
      dispatch(getLayersStyles());
      dispatch(getExtraLayers());
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
        noValidate
        sx={{ width: 900 }}
        defaultValues={{
          legend_urls: []
        }}
      >
        <Box display={displayStyle}>
          <Box flex={1} mr={mrStyle}>
            <TextInput source="name" isRequired fullWidth variant="outlined" />
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
        </Box>

        <Box display={displayStyle}>
          <Box flex={1} mr={mrStyle}>
            <TextInput source="type" fullWidth variant="outlined" />
          </Box>
          <Box flex={1} ml={mlStyle}>
            <SelectArrayInput
              label="Legend URL's"
              source="legend_urls"
              choices={[]}
              variant="outlined"
              sx={{ width: "100%" }}
            />
          </Box>
        </Box>

        <Box display={displayStyle}>
          <Box flex={1}>
            <TextInput
              source="special_attribute"
              fullWidth
              variant="outlined"
            />
          </Box>
        </Box>
        <Box display={displayStyle}>
          <Box flex={1} mr={mrStyle}>
            <SelectInput
              source="style_library_name"
              emptyText={"Select a style library"}
              isRequired
              fullWidth
              choices={
                loading ? [{ name: "Loading styles..." }] : layerStylesList
              }
              variant="outlined"
            />
          </Box>
          {/* <Box flex={1} ml={mlStyle}>
            <SelectInput
              source="source"
              emptyText={"Select a source data"}
              isRequired
              fullWidth
              choices={
                loading
                  ? [{ name: "Loading extra layers data..." }]
                  : extraLayersList
              }
              optionText="id"
              optionValue="id"
              variant="outlined"
            />
          </Box> */}
        </Box>
      </SimpleForm>
    </Create>
  );
}
