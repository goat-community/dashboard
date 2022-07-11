import { useAppSelector } from "@hooks/context";

export function NotifierWrapper() {
  const notifierReducer = useAppSelector((state) => state.notifier);

  if (notifierReducer.msg) {
    return (
      <>
        {notifierReducer.type === "info" && (
          <div className="notify-info">{notifierReducer.msg}</div>
        )}
        {notifierReducer.type === "error" && (
          <div className="notify-error">{notifierReducer.msg}</div>
        )}
        {notifierReducer.type === "warning" && (
          <div className="notify-warning">{notifierReducer.msg}</div>
        )}
        {notifierReducer.type === "success" && (
          <div className="notify-success">{notifierReducer.msg}</div>
        )}
      </>
    );
  } else {
    return <></>;
  }
}
