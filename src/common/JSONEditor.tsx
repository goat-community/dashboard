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
  const { defaultValue = "", onChange } = props;

  // function default_height_of_editor(content_length: number) {
  //   if (content_length >= 800) {
  //     return "550px";
  //   }
  //   return `${content_length + 120 / 2 }px`;
  // }

  return (
    <div style={{ width: "100%" }}>
      <AceEditor
        defaultValue={defaultValue}
        mode="json"
        theme="dracula"
        name="editor"
        width="100%"
        // height={default_height_of_editor(defaultValue.length)}
        maxLines={Infinity}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          useWorker: false,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          hScrollBarAlwaysVisible: true,
        }}
        onChange={onChange}
        style={{ borderRadius: 10 }}
      />
    </div>
  );
}
