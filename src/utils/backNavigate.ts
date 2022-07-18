export function backNavigate() {
  if (document.referrer.indexOf(window.location.host) !== -1) {
    window.history.back();
  } else {
    window.location.href = "/";
  }
}
