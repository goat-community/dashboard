import { useState } from "react";
import { Form, required, useTranslate } from "react-admin";
import { Card, CardActions } from "@mui/material";
import Box from "@mui/material/Box";
import { PButton, PTextInput } from "@common";
import GoatLogo from "@assets/images/logo_green.png";
import "./Login.scss";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const translate = useTranslate();

  return (
    <Form onSubmit={() => {}} noValidate>
      <Box className="login-wrapper">
        <Card className="login-card-wrapper">
          <img src={GoatLogo} alt="GOAT logo" width="300" />
          <h4>{translate("ra.page.dashboard")}</h4>
          <Box sx={{ padding: "0 1em 1em 1em" }}>
            <Box sx={{ marginTop: "1em" }}>
              <PTextInput
                autoFocus
                source="username"
                label={translate("ra.auth.username")}
                disabled={loading}
                fullWidth
              />
            </Box>
            <Box sx={{ marginTop: "1em" }}>
              <PTextInput
                source="password"
                label={translate("ra.auth.password")}
                type="password"
                disabled={loading}
                fullWidth
              />
            </Box>
          </Box>
          <CardActions sx={{ padding: "0 1em 1em 1em" }}>
            <PButton
              variant="contained"
              fullWidth
              colors="primary"
              text={translate("ra.auth.sign_in")}
            />
          </CardActions>
        </Card>
      </Box>
    </Form>
  );
};
export default LoginForm;
