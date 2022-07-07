import { Button, CircularProgress } from "@mui/material";

interface PButtonProps {
  text: string;
  colors: "primary" | "secondary";
  loading?: boolean;
  disabled?: boolean;
  variant?: "contained" | "outlined" | "text";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  style?: React.CSSProperties;

  onClick?: () => void;
}

export function PButton(props: PButtonProps) {
  const {
    text,
    colors,
    loading = false,
    disabled = false,
    variant = "contained",
    size = "medium",
    fullWidth = false,
    style = {},
    onClick = () => {}
  } = props;

  return (
    <Button
      variant={variant}
      fullWidth={fullWidth}
      sx={style}
      onClick={onClick}
      size={size}
      className={`p-button ${colors} ${disabled && "disabled"}`}
    >
      {loading && <CircularProgress size={25} thickness={2} />}
      {text}
    </Button>
  );
}
