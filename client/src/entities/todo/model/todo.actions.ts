import { createTodo, getCurrentTodo } from "../api/todo.api"
import { ICreateTodoParams, IGetCurrentTodoParams } from "../api/todo.dto"

export const getCurrentTodoRequest = async (params: IGetCurrentTodoParams) => {
  const response = await getCurrentTodo(params)
  return response.data
}

export const createTodoRequest = async (params: ICreateTodoParams) => {
  const response = await createTodo(params)
  return response.data
}
