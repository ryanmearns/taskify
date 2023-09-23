import z from "zod";

export const isError = (e: any) => e instanceof Error;

export const isNextRedirectError = (e: any) =>
  isError(e) && e.message === "NEXT_REDIRECT";

export const isNextNotFoundError = (e: any) =>
  isError(e) && e.message === "NEXT_NOT_FOUND";

export const DEFAULT_SERVER_ERROR =
  "Something went wrong while executing the operation";

/**
 * Type of the function called from Client Components with typesafe input data for the Server Action.
 */
export type ClientCaller<IV extends z.ZodTypeAny, Data> = (
  input: z.input<IV>
) => Promise<{
  data?: Data;
  serverError?: string;
  validationError?: Partial<Record<keyof z.input<IV>, string[]>>;
}>;

/**
 * Type of the function that executes server code when defining a new safe action.
 */
export type ActionServerFn<
  IV extends z.ZodTypeAny,
  Data,
  Context extends object,
> = (parsedInput: z.input<IV>, ctx: Context) => Promise<Data>;

export type MaybePromise<T> = T | Promise<T>;

/**
 * Type of `res` object returned by `useAction` and `useOptimisticAction` hooks.
 */
export type HookRes<IV extends z.ZodTypeAny, Data> = Awaited<
  ReturnType<ClientCaller<IV, Data>>
> & {
  fetchError?: unknown;
};

/**
 * Type of hooks callbacks (`onSuccess` and `onError`).
 * These are executed when the action succeeds or fails.
 */
export type HookCallbacks<IV extends z.ZodTypeAny, Data> = {
  onSuccess?: (
    data: NonNullable<Pick<HookRes<IV, Data>, "data">["data"]>,
    reset: () => void
  ) => void;
  onError?: (error: Omit<HookRes<IV, Data>, "data">, reset: () => void) => void;
  onMutate?: (input: IV["_output"]) => void;
};
