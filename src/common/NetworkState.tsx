import { useAppSelector } from "@hooks/context";

export function NetworkState() {
  const networkReducer = useAppSelector((state) => state.network);

  return (
    <>
      {networkReducer.loading && <div>Loading...</div>}
      {networkReducer.error && <div>{networkReducer.error}</div>}
    </>
  );
}
