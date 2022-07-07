import { useAppDispatch, useAppSelector } from "@hooks/context";
import LogoLight from "@assets/images/logo-light-typed.png";
import "./Login.scss";
import LoginForm from "./LoginForm";
import { LocalChanger } from "@common/LocalChanger";

export default function LoginPage(): JSX.Element {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  return (
    <section className="login-container">
      <div className="login-header-container">
        <img src={LogoLight} alt="plan4better" className="login-logo" />
        <LocalChanger />
      </div>
      <LoginForm />
    </section>
  );
}
