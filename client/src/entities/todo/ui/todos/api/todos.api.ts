import { AxiosPromise } from "axios"
import { IGetAllTodosParams, IGetAllTodosResponse } from "../model/todos.types"
import { api } from "shared/api"

export const getAllTodos = (params: IGetAllTodosParams): AxiosPromise<IGetAllTodosResponse> =>
  api.get("/todo/all", {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  })
