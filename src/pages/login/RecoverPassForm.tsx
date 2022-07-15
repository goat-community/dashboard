import { Formik } from "formik";
import { Form } from "react-admin";
import { Card, CardActions } from "@mui/material";
import Box from "@mui/material/Box";
import { recoverWithEmail } from "@context/user";
import type { RecoverPassCreditionals } from "@types";
import { useAppDispatch, useLoading } from "@hooks";
import { PButton, PTextInput } from "@common";
import GoatLogo from "@assets/images/logo_green.webp";
import "./Login.scss";
import { FlipForm } from "./FlipForm";

interface RecoverPassFormProps {
  formFliped: boolean;
  flipForm: () => void;
}

const RecoverPassForm = (props: RecoverPassFormProps) => {
  const loading = useLoading();
  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={{ email: "" } as RecoverPassCreditionals}
      validate={(creditionals: RecoverPassCreditionals) => {
        const errors = {} as RecoverPassCreditionals;
        // email validate
        if (!creditionals.email) {
          errors.email = "email is required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(creditionals.email)
        ) {
          errors.email = "Invalid email";
        }

        return errors;
      }}
      onSubmit={(creditionals, { setSubmitting }) => {
        setSubmitting(false);
        dispatch(recoverWithEmail(creditionals));
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
        /* and other goodies */
      }) => (
        <Form>
          <Box className="login-wrapper">
            <Card className="login-card-wrapper">
              <img src={GoatLogo} alt="GOAT logo" width={250} height="auto" />
              <h4>Dashboard</h4>
              <br />
              <Box sx={{ padding: "0 1em 1em 1em" }}>
                <Box>
                  <PTextInput
                    autoFocus={false}
                    source="email"
                    label="email"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    helperText={false}
                  />
                </Box>
                {errors.email && touched.email && <p>{errors.email}</p>}
              </Box>
              <CardActions sx={{ padding: "0 1em 0 1em" }}>
                <PButton
                  variant="contained"
                  fullWidth
                  colors="primary"
                  loading={loading}
                  text="Recovery"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                />
              </CardActions>
              <FlipForm
                formFliped={props.formFliped}
                flipForm={props.flipForm}
              />
            </Card>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
export default RecoverPassForm;
