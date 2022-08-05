// Ace Editor for JSON
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";

interface JSONEditorProps {
  defaultValue?: string;
  onChange: (value: string, event?: any) => void;
}

export function JSONEditor(props: JSONEditorProps) {
  const { defaultValue, onChange } = props;

  return (
    <div style={{ width: "100%" }}>
      <AceEditor
        defaultValue={defaultValue}
        mode="json"
        theme="dracula"
        name="editor"
        width="100%"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          useWorker: false,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true
        }}
        onChange={onChange}
        style={{ borderRadius: 10 }}
      />
    </div>
  );
}
