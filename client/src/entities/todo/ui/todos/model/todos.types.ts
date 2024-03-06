import { ITodo } from ".."

export interface IGetAllTodosResponse {
  todos: ITodo[]
  status: "ok"
  message: string
}

export interface IGetAllTodosParams {
  token: string
}
