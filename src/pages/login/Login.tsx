import { useState } from "react";
import LogoLight from "@assets/images/logo-light-typed.png";
import "./Login.scss";
import LoginForm from "./LoginForm";
import RecoverPassForm from "./RecoverPassForm";

export default function LoginPage(): JSX.Element {
  const [formFliped, setFormFlipped] = useState(false);

  return (
    <section className="login-container">
      <img
        src={LogoLight}
        alt="plan4better"
        className="login-logo"
        width={180}
        height={41}
      />
      {formFliped ? (
        <RecoverPassForm
          formFliped={formFliped}
          flipForm={() => setFormFlipped((prevState) => !prevState)}
        />
      ) : (
        <LoginForm
          formFliped={formFliped}
          flipForm={() => setFormFlipped((prevState) => !prevState)}
        />
      )}
    </section>
  );
}
