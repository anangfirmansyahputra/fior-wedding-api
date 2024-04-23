export enum ErrorCode {
  // Kesalahan Umum
  UNKNOWN_ERROR = 1013,

  // Kesalahan Akses dan Otorisasi
  ACCESS_DENIED = 1008,
  TOKEN_EXPIRED = 1005,
  TOKEN_INVALID = 1006,
  TOKEN_NOT_PROVIDED = 1007,
  LOGIN_FAILED = 1015,

  // Kesalahan Data dan Operasi CRUD
  INVALID_INPUT = 1004,
  FAILED_CREATE = 1001,
  FAILED_UPDATE = 1002,
  FAILED_DELETE = 1003,
  RESOURCE_NOT_FOUND = 1009,
  NOT_FOUND = 1018,

  // Kesalahan Autentikasi dan Identitas
  SIGNUP_FAILED = 1014,
  PASSWORD_INCORRECT = 1016,
  EMAIL_INCORRECT = 1017,

  // Kesalahan Server dan Koneksi
  INTERNAL_SERVER_ERROR = 1010,
  DATABASE_CONNECTION_ERROR = 1011,
  NETWORK_ERROR = 1012,
}

export const getErrorMessage = (errorCode: ErrorCode): string => {
  const errorKey = Object.keys(ErrorCode).find(
    (key) => ErrorCode[key as keyof typeof ErrorCode] === errorCode
  );
  return errorKey || "Unknown error";
};
