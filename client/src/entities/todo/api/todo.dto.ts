export interface ICreateTodoParams {
  value: string
  token: string
}

export interface IGetCurrentTodoParams {
  token: string
  id: string
}
