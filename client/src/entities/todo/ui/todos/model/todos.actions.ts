import { getAllTodos } from "../api/todos.api"
import { IGetAllTodosParams } from "./todos.types"

export const getAllTodosRequest = async (params: IGetAllTodosParams) => {
  const response = await getAllTodos(params)
  return response.data
}
