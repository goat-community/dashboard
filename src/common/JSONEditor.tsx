// Ace Editor for JSON
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";

interface JSONEditorProps {
  defaultValue?: string;
  height?: string;
  onChange: (value: string, event?: any) => void;
}

export function JSONEditor(props: JSONEditorProps) {
  const { defaultValue, height = "300px", onChange } = props;

  return (
    <div style={{ width: "100%" }}>
      <AceEditor
        defaultValue={defaultValue}
        mode="json"
        theme="dracula"
        name="editor"
        width="100%"
        height={height}
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
