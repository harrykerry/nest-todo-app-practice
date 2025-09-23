// src/helpers/response.helper.ts

export interface SuccessResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface ErrorResponse<E = string | object> {
  statusCode: number;
  message: string;
  error: E;
}

export function successResponse<T>(
  statusCode: number,
  message: string,
  data: T,
): SuccessResponse<T> {
  return {
    statusCode,
    message,
    data,
  };
}

export function errorResponse<E = string | object>(
  statusCode: number,
  message: string,
  error: E,
): ErrorResponse<E> {
  return {
    statusCode,
    message,
    error,
  };
}
