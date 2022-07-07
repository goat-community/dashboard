import { Form } from "react-admin";
import { Card, CardActions } from "@mui/material";
import Box from "@mui/material/Box";
import { PButton, PTextInput } from "@common";
import GoatLogo from "@assets/images/logo_green.png";
import "./Login.scss";

const LoginForm = () => {
  return (
    <Form onSubmit={() => {}} noValidate>
      <Box className="login-wrapper">
        <Card className="login-card-wrapper">
          <img src={GoatLogo} alt="GOAT logo" width="300" />
          <h4>Dashboard</h4>
          <Box sx={{ padding: "0 1em 1em 1em" }}>
            <Box sx={{ marginTop: "1em" }}>
              <PTextInput
                autoFocus
                source="username"
                label="username"
                fullWidth
              />
            </Box>
            <Box sx={{ marginTop: "1em" }}>
              <PTextInput
                source="password"
                label="password"
                type="password"
                fullWidth
              />
            </Box>
          </Box>
          <CardActions sx={{ padding: "0 1em 1em 1em" }}>
            <PButton
              variant="contained"
              fullWidth
              colors="primary"
              text="sign in"
            />
          </CardActions>
        </Card>
      </Box>
    </Form>
  );
};
export default LoginForm;
