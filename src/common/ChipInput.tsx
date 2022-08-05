import { useState } from "react";
import { Autocomplete, TextField, Chip } from "@mui/material";

interface ChipInputProps {
  defaultValue?: string[];
  label: string;
  onChange: (value: string[]) => void;
}

export function ChipInput(props: ChipInputProps) {
  const [receivers, setReceivers] = useState<string[]>([]);
  return (
    <Autocomplete
      multiple
      id="tags-filled"
      options={[]}
      defaultValue={props.defaultValue || []}
      freeSolo
      onChange={(_, value: any) => props.onChange([...value])}
      renderTags={(
        value: any[],
        getTagProps: (arg0: { index: any }) => JSX.IntrinsicAttributes
      ) =>
        value.map((option: any, index: any) => {
          return (
            <Chip
              key={index}
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          );
        })
      }
      renderInput={(params: any) => (
        <TextField
          {...params}
          label={props.label}
          placeholder={`Add a ${props.label} by pressing enter after its dotName or address`}
          variant="outlined"
        />
      )}
    />
  );
}
