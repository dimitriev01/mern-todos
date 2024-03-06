import { registerRequest } from "entities/user"
import { ChangeEvent, useEffect, useState } from "react"
import { TypeResponse } from "shared/api"
import { useToast } from "shared/lib/hooks"

export default function Registration() {
  const messageFunc = useToast()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<TypeResponse>("")
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const registerHandler = () => {
    setLoading(true)
    registerRequest({ ...form })
      .then(res => {
        setMessage(res)
      })
      .catch(res => setMessage(res.response.data))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    messageFunc(message, setMessage)
  }, [message, messageFunc, setMessage])

  return (
    <div>
      <input value={form.email} name="email" onChange={changeHandler} disabled={loading} />
      <input value={form.password} name="password" onChange={changeHandler} disabled={loading} />
      <button
        onClick={registerHandler}
        className="btn waves-effect waves-light"
        type="submit"
        disabled={loading}
        name="action"
      >
        REGISTER
      </button>
    </div>
  )
}
