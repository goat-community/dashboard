import { useAppDispatch, useAppSelector } from "@hooks/context";
import { getToken } from "@context/user";

export default function LoginPage() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  function fakeLogin() {
    dispatch(
      getToken({
        username: "",
        password: ""
      })
    );
  }

  return <button onClick={fakeLogin}>Login</button>;
}
