export type OptimisticUpdate<T> = (
  action: T | ((pendingState: T) => T)
) => void;
