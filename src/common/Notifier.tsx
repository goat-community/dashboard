import { useAppSelector } from "@hooks/context";

export function NotifierWrapper() {
  const notifierReducer = useAppSelector((state) => state.notifier);

  if (notifierReducer.msg) {
    const msg = notifierReducer.msg.toString();
    return (
      <>
        {notifierReducer.type === "info" && (
          <div className="notify-info">{msg}</div>
        )}
        {notifierReducer.type === "error" && (
          <div className="notify-error">{msg}</div>
        )}
        {notifierReducer.type === "warning" && (
          <div className="notify-warning">{msg}</div>
        )}
        {notifierReducer.type === "success" && (
          <div className="notify-success">{msg}</div>
        )}
      </>
    );
  } else {
    return <></>;
  }
}
