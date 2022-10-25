import {
  LoadingIndicator,
  SaveButton,
  Toolbar,
  useNotify,
  useRedirect
} from "react-admin";
import { PButton } from "@common/Button";

export default function UserCreateToolbar(props: { loading?: boolean }) {
  const redirect = useRedirect();
  const notify = useNotify();
  return (
    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
      {props.loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <SaveButton
            icon={<></>}
            label="Create"
            mutationOptions={{
              onSuccess: () => {
                notify("User created successfully", {
                  type: "success",
                  messageArgs: { smart_count: 1 }
                });
                redirect("..");
              },
              onError(error: any) {
                notify(error.toString(), { type: "error" });
              }
            }}
            type="button"
          />
          <PButton
            text="Cancel"
            onClick={() => redirect("..")}
            colors="error"
          />
        </>
      )}
    </Toolbar>
  );
}
