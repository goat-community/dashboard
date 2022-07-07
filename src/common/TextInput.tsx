import { type ChangeEvent } from "react";
import { TextInput } from "react-admin";

interface PTextInputProps {
  value: string;
  source: string;
  label: string;
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
    source,
    label,
    value,
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
      source={source}
      label={label}
      type={type}
      disabled={disabled}
      validate={validation}
      fullWidth={fullWidth}
      onChange={onChange}
      value={value}
      onBlur={onBlur}
    />
  );
}
