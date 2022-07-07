import { useAppSelector } from "@hooks/context";

export function NetworkState() {
  const networkReducer = useAppSelector((state) => state.network);

  return (
    <>
      {networkReducer.loading && <div className="loading-bar" />}
      {networkReducer.error && (
        <div className="network-error">{networkReducer.error}</div>
      )}
    </>
  );
}
