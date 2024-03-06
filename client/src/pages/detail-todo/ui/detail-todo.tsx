import { ITodo, Todo, getCurrentTodoRequest } from "entities/todo"
import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { TypeResponse } from "shared/api"
import { useToast } from "shared/lib/hooks"
import { useAuth } from "shared/lib/hooks/use-auth"
import { Loader } from "shared/ui/loaders"

export default function DetailTodo() {
  const [todo, setTodo] = useState<ITodo | null>(null)
  const { token } = useAuth()
  const todoId = useParams().id
  const [loading, setLoading] = useState(false)
  const messageFunc = useToast()
  const [message, setMessage] = useState<TypeResponse>("")

  const getDetailTodo = useCallback(async () => {
    if (token && todoId) {
      setLoading(true)
      await getCurrentTodoRequest({
        id: todoId,
        token,
      })
        .then(res => {
          setMessage(res)
          setTodo(res.todo)
        })
        .catch(res => setMessage(res.response.data))
        .finally(() => setLoading(false))
    }
  }, [todoId, token])

  useEffect(() => {
    messageFunc(message, setMessage)
  }, [message, messageFunc, setMessage])

  useEffect(() => {
    getDetailTodo()
  }, [getDetailTodo])

  if (loading) {
    return <Loader />
  }

  return <div>{!loading && todo && <Todo todo={todo} />}</div>
}
