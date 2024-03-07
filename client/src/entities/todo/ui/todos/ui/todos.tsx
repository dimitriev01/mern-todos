import { useCallback, useEffect, useState } from "react"
import { ITodo } from ".."
import { getAllTodosRequest } from "../model/todos.actions"
import { useAuth, useToast } from "shared/lib/hooks"
import { TypeResponse } from "shared/api"
import { Link } from "react-router-dom"

export const TodoList = () => {
  const { token } = useAuth()
  const messageFunc = useToast()
  const [message, setMessage] = useState<TypeResponse>("")
  const [todos, setTodos] = useState<ITodo[]>([])

  const fetchTodos = useCallback(async () => {
    if (token) {
      getAllTodosRequest({ token })
        .then(res => {
          setMessage(res)
          setTodos(res.todos)
        })
        .catch(res => setMessage(res.response.data))
    }
  }, [token])

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  useEffect(() => {
    messageFunc(message, setMessage)
  }, [message, messageFunc, setMessage])

  if (!todos.length) {
    return <p className="center">No todos</p>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Value</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo, i) => (
          <tr key={todo._id}>
            <td>{i + 1}</td>
            {/* <td>{todo.creator}</td> */}
            <td>{todo.value}</td>
            <td>{new Date(todo.date).toLocaleString()}</td>
            <td>
              <Link to={`/todo/${todo._id}`}>Открыть</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
