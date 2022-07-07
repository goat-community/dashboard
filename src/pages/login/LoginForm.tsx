import { Formik } from "formik";
import { Form } from "react-admin";
import { Card, CardActions } from "@mui/material";
import Box from "@mui/material/Box";
import GoatLogo from "@assets/images/logo_green.png";
import { PButton, PTextInput } from "@common";
import { login } from "@context/user";
import { useAppDispatch, useLoading } from "@hooks";
import type { UserCreditionals } from "@types";
import "./Login.scss";

const LoginForm = () => {
  const loading = useLoading();
  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={{ username: "", password: "" } as UserCreditionals}
      validate={(creditionals: UserCreditionals) => {
        const errors = {} as UserCreditionals;
        // username validate
        if (!creditionals.username) {
          errors.username = "Username is required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
            creditionals.username
          )
        ) {
          errors.username = "Invalid username";
        }
        // password validate
        if (!creditionals.password) {
          errors.password = "Password is required";
        }

        return errors;
      }}
      onSubmit={(creditionals, { setSubmitting }) => {
        setSubmitting(false);
        dispatch(login(creditionals));
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
              <img src={GoatLogo} alt="GOAT logo" width="300" />
              <h4>Dashboard</h4>
              <br />
              <Box sx={{ padding: "0 1em 1em 1em" }}>
                <PTextInput
                  autoFocus
                  source="username"
                  label="username"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
                {errors.username && touched.username && (
                  <h6>{errors.username}</h6>
                )}
                <PTextInput
                  source="password"
                  label="password"
                  type="password"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && (
                  <h6>{errors.password}</h6>
                )}
              </Box>
              <CardActions sx={{ padding: "0 1em 1em 1em" }}>
                <PButton
                  variant="contained"
                  fullWidth
                  colors="primary"
                  loading={loading}
                  text="sign in"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                />
              </CardActions>
            </Card>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
export default LoginForm;
