import { type ChangeEvent } from "react";
import { TextInput } from "react-admin";

interface PTextInputProps {
  value: string;
  source: string;
  label: string;
  helperText?: string | false;
  type?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  fullWidth?: boolean;
  validation?: any;
  onChange?: (e: ChangeEvent<any>) => void;
  onBlur?: (e: ChangeEvent<any>) => void;
}

export function PTextInput(props: PTextInputProps) {
  const {
    helperText = false,
    type = "text",
    disabled,
    autoFocus,
    fullWidth = false,
    validation,
    onChange = () => {},
    onBlur = () => {}
  } = props;

  return (
    <TextInput
      autoFocus={autoFocus}
      type={type}
      disabled={disabled}
      validate={validation}
      fullWidth={fullWidth}
      onChange={onChange}
      onBlur={onBlur}
      helperText={helperText}
      {...props}
    />
  );
}
