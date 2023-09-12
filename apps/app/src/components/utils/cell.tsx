import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

const Cell = (props: {
  children: React.ReactNode;
  Failure: React.ReactElement;
  Loading: React.ReactElement;
}) => {
  return (
    <ErrorBoundary fallback={props.Failure}>
      <Suspense fallback={props.Loading}>{props.children}</Suspense>
    </ErrorBoundary>
  );
};

export { Cell };
