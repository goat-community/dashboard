import { useEffect, useState } from "react";

export function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const userInfo = localStorage.getItem("user_info");

    if (token && userInfo) {
      // now we should fetch user info
      setAuthenticated(true);
    }
  }, []);

  return { authenticated };
}
