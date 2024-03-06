import { AuthContext } from "app/context"
import { loginRequest } from "entities/user"
import { ChangeEvent, useContext, useEffect, useState } from "react"
import { TypeResponse } from "shared/api"
import { useToast } from "shared/lib/hooks"

export default function Login() {
  const messageFunc = useToast()
  const auth = useContext(AuthContext)
  const [message, setMessage] = useState<TypeResponse>("")
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const loginHadler = () => {
    setLoading(true)
    loginRequest({ ...form })
      .then(res => {
        setMessage(res)
        auth.login(res.token, res.userId)
      })
      .catch(res => setMessage(res.response.data))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    messageFunc(message, setMessage)
  }, [message, messageFunc, setMessage])

  return (
    <div>
      <input name="email" value={form.email} onChange={changeHandler} />
      <input name="password" value={form.password} onChange={changeHandler} />
      <button
        onClick={loginHadler}
        className="btn waves-effect waves-light"
        type="submit"
        disabled={loading}
        name="action"
      >
        LOGIN
      </button>
    </div>
  )
}
