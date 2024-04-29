import { Response } from "express";
import { ErrorCode, getErrorMessage } from "../lib/error-code";
type ErrorProps = {
  res: Response;
  type:
    | "invalid"
    | "not found"
    | "internal error"
    | "token not provided"
    | "token expired"
    | "unauthorized"
    | "no permissions";
  message?: string;
};

export const errorResponse = ({ type, message, res }: ErrorProps) => {
  switch (type) {
    case "not found":
      return res.status(404).json({
        success: false,
        errors: {
          error_code: ErrorCode.NOT_FOUND,
          error_message: getErrorMessage(ErrorCode.NOT_FOUND),
          message,
        },
      });
    case "invalid":
      return res.status(400).json({
        success: false,
        errors: {
          error_code: ErrorCode.INVALID_INPUT,
          error_message: getErrorMessage(ErrorCode.INVALID_INPUT),
          message,
        },
      });
    case "internal error":
      return res.status(500).json({
        success: false,
        errors: {
          error_code: ErrorCode.INTERNAL_SERVER_ERROR,
          error_message: getErrorMessage(ErrorCode.INTERNAL_SERVER_ERROR),
          message: message ?? "Internal Server Error",
        },
      });
    case "token not provided":
      return res.status(401).json({
        success: false,
        errors: {
          error_code: ErrorCode.TOKEN_NOT_PROVIDED,
          error_message: getErrorMessage(ErrorCode.TOKEN_NOT_PROVIDED),
          message,
        },
      });
    case "token expired":
      return res.status(401).json({
        success: false,
        errors: {
          error_code: ErrorCode.TOKEN_EXPIRED,
          error_message: getErrorMessage(ErrorCode.TOKEN_EXPIRED),
          message,
        },
      });
    case "unauthorized":
      return res.status(401).json({
        success: false,
        errors: {
          error_code: ErrorCode.TOKEN_INVALID,
          error_message: getErrorMessage(ErrorCode.TOKEN_INVALID),
          message,
        },
      });
    case "no permissions":
      return res.status(403).json({
        success: false,
        errors: {
          error_code: ErrorCode.ACCESS_DENIED,
          error_message: getErrorMessage(ErrorCode.ACCESS_DENIED),
          message,
        },
      });
    default:
  }
};
