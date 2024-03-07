import { TodoList, createTodoRequest } from "entities/todo"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { TypeResponse } from "shared/api"
import { useAuth, useToast } from "shared/lib/hooks"

export default function Main() {
  const { token } = useAuth()
  const messageFunc = useToast()
  const [message, setMessage] = useState<TypeResponse>("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [text, setText] = useState("")

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      createTodoHandler()
    }
  }

  const changeTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const createTodoHandler = () => {
    if (token) {
      setLoading(true)
      createTodoRequest({
        value: text,
        token,
      })
        .then(res => {
          navigate(`/todo/${res.newTodo._id}`)
          setMessage(res)
        })
        .catch(res => setMessage(res.response.data))
        .finally(() => {
          setLoading(false)
          setText("")
        })
    }
  }

  useEffect(() => {
    messageFunc(message, setMessage)
  }, [message, messageFunc, setMessage])

  return (
    <div>
      <input value={text} onChange={changeTextHandler} onKeyUp={handleKeyPress} />
      <button
        onClick={createTodoHandler}
        className="btn waves-effect waves-light"
        type="button"
        disabled={loading}
      >
        Create todo
      </button>
      <TodoList />
    </div>
  )
}
