export interface ITodo {
  date: Date
  value: string
  _id: string
}

export interface IGetCurrentTodoResponse {
  todo: ITodo
  message: string
  status: "ok"
}

export interface ICreateTodoResponse {
  message: string
  status: "ok"
  newTodo: ITodo
}
