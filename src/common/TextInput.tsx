import { TextInput, required } from "react-admin";

interface PTextInputProps {
  source: string;
  label: string;
  type?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  fullWidth?: boolean;
  validation?: any;
  onChange?: () => object;
}

export function PTextInput(props: PTextInputProps) {
  const {
    source,
    label,
    type = "text",
    disabled,
    autoFocus,
    fullWidth = false,
    validation,
    onChange = () => {}
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
    />
  );
}
