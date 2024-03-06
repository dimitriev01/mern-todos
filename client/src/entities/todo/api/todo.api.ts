import { AxiosPromise } from "axios"
import { api } from "shared/api"
import { ICreateTodoResponse, IGetCurrentTodoResponse } from "../model/todo.types"
import { ICreateTodoParams, IGetCurrentTodoParams } from "./todo.dto"

export const getCurrentTodo = (
  params: IGetCurrentTodoParams
): AxiosPromise<IGetCurrentTodoResponse> =>
  api.get(`/todo/${params.id}`, {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  })

export const createTodo = (params: ICreateTodoParams): AxiosPromise<ICreateTodoResponse> =>
  api.post(
    "/todo/create",
    { value: params.value },
    {
      headers: {
        Authorization: `Bearer ${params.token}`,
      },
    }
  )
