import { Routes, Route } from "react-router-dom";

import LoginPage from "@pages/login/Login.page";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}
