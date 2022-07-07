import LogoLight from "@assets/images/logo-light-typed.png";
import "./Login.scss";
import LoginForm from "./LoginForm";

export default function LoginPage(): JSX.Element {
  return (
    <section className="login-container">
      <img src={LogoLight} alt="plan4better" className="login-logo" />
      <LoginForm />
    </section>
  );
}
