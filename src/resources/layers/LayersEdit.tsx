import { useState } from "react";
import {
  SimpleForm,
  TextInput,
  useRedirect,
  Edit,
  useRecordContext,
  Toolbar,
  SaveButton,
  DeleteButton,
  useEditController
} from "react-admin";
import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// Ace Editor
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";

export const validateForm = (v: Record<string, any>): Record<string, any> => {
  const errors = {} as any;
  if (!v.name) {
    errors.name = "Layer name is required";
  }

  return errors;
};

export const JSONViewer = (props: {
  jsonResource: string;
  onChange: (value: string, event?: any) => void;
}) => {
  const { jsonResource, onChange } = props;
  const record = useRecordContext();
  return (
    <div style={{ width: "100%" }}>
      <AceEditor
        mode="json"
        theme="dracula"
        defaultValue={JSON.stringify(record[jsonResource], null, 2)}
        name="editor"
        width="100%"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          useWorker: false,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true
        }}
        onChange={onChange}
        style={{ borderRadius: 10 }}
      />
    </div>
  );
};

const CustomToolbar = (props: any) => {
  return (
    <Toolbar
      {...props}
      sx={{ display: "flex", justifyContent: "space-between" }}
    >
      <SaveButton alwaysEnable />
      <DeleteButton mutationMode="pessimistic" />
    </Toolbar>
  );
};

export default function LayersEdit() {
  const { save } = useEditController();
  const redirect = useRedirect();
  const [translation, setTranslation] = useState<undefined | string>(undefined);
  const [styles, setStyles] = useState<undefined | string>(undefined);

  const postSave = (data: any) => {
    const mixedData = {
      ...data,
      translation:
        translation === undefined ? data.translation : JSON.parse(translation),
      style: styles === undefined ? data.style : JSON.parse(styles)
    };

    save!({
      ...mixedData
    });
  };

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
          <Box flex={1}>
            <TextInput source="name" isRequired fullWidth variant="outlined" />
          </Box>
        </Box>
        <Box>
          <Typography variant="h5">Styles</Typography>
        </Box>
        <br />
        <Box display={displayStyle}>
          <JSONViewer
            jsonResource="style"
            onChange={(newStyle: string) => {
              setStyles(newStyle);
            }}
          />
        </Box>
        <Box>
          <Typography variant="h5">Translations</Typography>
        </Box>
        <br />
        <Box display={displayStyle} className="mt-5 pt-5">
          <JSONViewer
            jsonResource="translation"
            onChange={(newTranslation: string) => {
              setTranslation(newTranslation);
            }}
          />
        </Box>
      </SimpleForm>
    </Edit>
  );
}
