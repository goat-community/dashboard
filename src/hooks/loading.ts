import { useAppSelector } from "./context";

export function useLoading() {
  const loading = useAppSelector((state) => state.network.loading);
  return loading;
}
