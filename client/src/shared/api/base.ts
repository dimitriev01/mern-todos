import axios from "axios"
import { errorHandler, responseHandler, requestHandler } from "./interceptors"

const api = axios.create({
  baseURL: `http://localhost:5000/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

// @ts-ignore
api.interceptors.request.use(requestHandler)
api.interceptors.response.use(responseHandler, errorHandler, {})

export default api

// apiInstance.interceptors.request.use(
//   function (config) {
//     return config
//   },
//   function (error) {
//     return Promise.reject(error)
//   }
// )

// export interface IResponse {
//   status: "ok"
//   message: string
// }

// export interface IError {
//   status: "error"
//   errors: Array<{ msg: string }> | string[]
// }

// apiInstance.interceptors.response.use(
//   function (response: AxiosResponse<IResponse>) {
//     return response
//   },
//   function (error: AxiosError<IError>) {
//     return Promise.reject(error)
//   }
// )

// export default apiInstance
