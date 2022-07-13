export function logout(): void {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user_info");

  window.location.reload();
}
