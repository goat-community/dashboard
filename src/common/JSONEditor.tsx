// Ace Editor for JSON
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";

interface JSONViewerProps {
  onChange: (value: string, event?: any) => void;
}

export function JSONViewer(props: JSONViewerProps) {
  const { onChange } = props;

  return (
    <div style={{ width: "100%" }}>
      <AceEditor
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
