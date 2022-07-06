import { useAppSelector } from "@hooks/context";

export default function LoginPage() {
  const user = useAppSelector((state) => state.user);

  return (
    <div>
      <h1>{user.username}</h1>
    </div>
  );
}
