import { IUserLoginParams, IUserRegisterParams } from "../api/user.dto"
import { login, register } from "../api/user.api"

export const loginRequest = async (params: IUserLoginParams) => {
  const response = await login(params)
  return response.data
}

export const registerRequest = async (params: IUserRegisterParams) => {
  const response = await register(params)
  return response.data
}
