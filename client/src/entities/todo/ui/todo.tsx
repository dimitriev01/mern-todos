import { ITodo } from "../model/todo.types"

interface ITodoProps {
  todo: ITodo
}

export const Todo = (props: ITodoProps) => {
  const { todo } = props

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 15px",
        backgroundColor: "#f8cc9e",
      }}
    >
      <div>{todo.value}</div>
      <div>{new Date(todo.date).toLocaleString()}</div>
    </div>
  )
}
