import { Button, CircularProgress } from "@mui/material";

interface PButtonProps {
  text: string;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  colors: "primary" | "secondary" | "error";
  variant?: "contained" | "outlined" | "text";
  size?: "small" | "medium" | "large";
  style?: React.CSSProperties;

  onClick?: () => void;
}

export function PButton(props: PButtonProps) {
  const {
    text,
    colors,
    loading = false,
    disabled = false,
    fullWidth = false,
    variant = "contained",
    size = "medium",
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
      {loading && (
        <CircularProgress size={25} thickness={6} sx={{ color: "white" }} />
      )}
      {!loading && text}
    </Button>
  );
}
