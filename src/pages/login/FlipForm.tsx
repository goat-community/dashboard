interface FlipFormProps {
  formFliped: boolean;
  flipForm: () => void;
}

export function FlipForm(props: FlipFormProps): JSX.Element {
  return (
    <p onClick={props.flipForm} className="form-flipper">
      {props.formFliped ? "Back to login" : "Forgot password?"}
    </p>
  );
}
