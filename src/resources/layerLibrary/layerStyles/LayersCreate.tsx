import { useState } from "react";
import {
  SimpleForm,
  TextInput,
  Create,
  useCreateController,
  Toolbar,
  SaveButton,
  LoadingIndicator
} from "react-admin";
import { Box, Typography } from "@mui/material";
import { JSONEditor } from "@common";
import { removeEmptyProperties } from "@utils";

export const validateForm = (v: Record<string, any>): Record<string, any> => {
  const errors = {} as any;
  if (!v.name) {
    errors.name = "name is required";
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

export default function LayersCreate() {
  const { save, saving } = useCreateController({ resource: "styles" });
  const [translation, setTranslation] = useState<string>();
  const [styles, setStyles] = useState<string>();
  const displayStyle = { xs: "block", sm: "flex", width: "100%" };

  const createLayer = (data: any) => {
    const mixedData = {
      ...data,
      translation: translation ? JSON.parse(translation) : {},
      style: styles ? JSON.parse(styles) : {}
    };

    save!({
      ...removeEmptyProperties(mixedData)
    });
  };

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
        onSubmit={createLayer}
        toolbar={<CustomToolbar loading={saving} />}
      >
        <Box display={displayStyle}>
          <Box flex={1}>
            <TextInput source="name" isRequired fullWidth variant="outlined" />
          </Box>
        </Box>

        <Box>
          <Typography variant="h5">Styles</Typography>
        </Box>
        <Box display={displayStyle}>
          <JSONEditor
            onChange={(newStyle: string) => {
              setStyles(newStyle);
            }}
          />
        </Box>

        <Box>
          <Typography variant="h5">Translations</Typography>
        </Box>
        <Box display={displayStyle} className="mt-5 pt-5">
          <JSONEditor
            onChange={(newTranslation: string) => {
              setTranslation(newTranslation);
            }}
          />
        </Box>
      </SimpleForm>
    </Create>
  );
}
