import { AxiosPromise } from "axios"
import { IUserLoginParams, IUserRegisterParams } from "./user.dto"
import { api } from "shared/api"
import { ILoginResponse, IRegisterResponse } from "../model/user.types"

export const login = (params: IUserLoginParams): AxiosPromise<ILoginResponse> =>
  api.post("/user/login", params)

export const register = (params: IUserRegisterParams): AxiosPromise<IRegisterResponse> =>
  api.post("/user/register", params)
