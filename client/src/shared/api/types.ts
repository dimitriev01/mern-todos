export interface IResponse {
  status: "ok"
  message: string
}

export interface IError {
  status: "error"
  errors: Array<{ msg: string }> | string[]
}

export type TypeResponse = IResponse | IError | ""

import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"

interface IErrorParam {
  msg: string
  code: number
  params: string
  param?: string
  field?: string
  location: string
}

export interface ApiErrorResponse {
  status: boolean
  errors: IErrorParam[]
}

export type ApiError<T = ApiErrorResponse> = AxiosError<T>

export type ApiResponse<T = ApiResponseData> = AxiosResponse<T>

export interface ApiResponseData<T = any> {
  data: T
  message: string
}

export type ApiRequestConfig<T = any> = AxiosRequestConfig<T>
