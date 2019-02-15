import httpStatus from "http-status";
import { APIError } from "../errors";
import { env } from "../../config/vars";

export const handler = (err, req, res, next) => {
  let convertedError = err;

  if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      status: err.status,
      stack: err.stack
    });
  }

  const response = {
    code: convertedError.status,
    message: convertedError.message || httpStatus[convertedError.status],
    errors: convertedError.errors,
    stack: convertedError.stack
  };

  if (env !== "development") {
    delete response.stack;
  }

  res.status(convertedError.status);
  res.json(response);
};

export const notFound = (req, res, next) => {
  const err = new APIError({
    message: "Not found",
    status: httpStatus.NOT_FOUND
  });
  return handler(err, req, res);
};
