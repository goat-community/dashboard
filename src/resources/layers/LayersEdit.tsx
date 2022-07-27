import {
  SimpleForm,
  TextInput,
  useRedirect,
  Edit,
  useRecordContext,
  useUpdate
} from "react-admin";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// Ace Editor
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";

export const validateForm = (v: Record<string, any>): Record<string, any> => {
  const errors = {} as any;
  if (!v.name) {
    errors.name = "name is required";
  }

  return errors;
};

export const JSONViewer = () => {
  const record = useRecordContext();
  return (
    <div style={{ width: "100%" }}>
      <AceEditor
        mode="json"
        theme="dracula"
        defaultValue={JSON.stringify(record.style, null, 2)}
        name="editor"
        width="100%"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          useWorker: false,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true
        }}
        style={{ borderRadius: 10 }}
      />
    </div>
  );
};

export default function LayersEdit() {
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
        <Box display={displayStyle}>
          <Box flex={1} mr={mrStyle}>
            <TextInput source="name" isRequired fullWidth variant="outlined" />
          </Box>
          <Box flex={1} ml={mlStyle}>
            <TextInput source="name" isRequired fullWidth variant="outlined" />
          </Box>
        </Box>
        <TextInput
          source="style"
          isRequired
          fullWidth
          variant="outlined"
          style={{ visibility: "hidden", height: 0 }}
        />

        <Box display={displayStyle}>
          <JSONViewer />
        </Box>
      </SimpleForm>
    </Edit>
  );
}
