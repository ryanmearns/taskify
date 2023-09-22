/**
 * @todo: @deprecated
 */

export function actionSuccess<T>(data: T) {
  return {
    data: data,
    error: false,
    time: new Date().getTime(),
  };
}

export function actionError(error: actionErrorStatus["code"]) {
  const err = actionErrorStatus.find((val) => val.code === error);

  return {
    data: null,
    errorCode: err!.code,
    errorHTTPCode: err!.httpCode,
    time: new Date().getTime(),
  };
}

type actionErrorStatus =
  | { code: "BAD_REQUEST"; httpCode: 400 }
  | { code: "UNAUTHORIZED"; httpCode: 401 }
  | { code: "FORBIDDEN"; httpCode: 403 }
  | { code: "NOT_FOUND"; httpCode: 404 }
  | { code: "TIMEOUT"; httpCode: 408 }
  | { code: "CONFLICT"; httpCode: 409 }
  | { code: "PRECONDITION_FAILED"; httpCode: 412 }
  | { code: "PAYLOAD_TOO_LARGE"; httpCode: 413 }
  | { code: "METHOD_NOT_SUPPORTED"; httpCode: 405 }
  | { code: "UNPROCESSABLE_CONTENT"; httpCode: 422 }
  | { code: "INTERNAL_SERVER_ERROR"; httpCode: 500 };

const actionErrorStatus = [
  { code: "BAD_REQUEST", httpCode: 400 },
  { code: "UNAUTHORIZED", httpCode: 401 },
  { code: "FORBIDDEN", httpCode: 403 },
  { code: "NOT_FOUND", httpCode: 404 },
  { code: "TIMEOUT", httpCode: 408 },
  { code: "CONFLICT", httpCode: 409 },
  { code: "PRECONDITION_FAILED", httpCode: 412 },
  { code: "PAYLOAD_TOO_LARGE", httpCode: 413 },
  { code: "METHOD_NOT_SUPPORTED", httpCode: 405 },
  { code: "UNPROCESSABLE_CONTENT", httpCode: 422 },
  { code: "INTERNAL_SERVER_ERROR", httpCode: 500 },
];
