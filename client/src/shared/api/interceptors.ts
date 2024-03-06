import { ApiError, ApiRequestConfig, ApiResponse } from "./types"

const CODE_UNAUTHORISED = 401
const CODE_FORBIDDEN = 403

export const errorHandler = (err: ApiError) => {
  if (err.response?.status === CODE_UNAUTHORISED || err.response?.status === CODE_FORBIDDEN) {
    // unauthorisedEvent();
  }

  return Promise.reject(err)
}

export const requestHandler = (config: ApiRequestConfig) => {
  const headers = config.headers || {}

  return { ...config, headers }
}

export const responseHandler = (res: ApiResponse) => res
