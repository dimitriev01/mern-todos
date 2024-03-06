import { useCallback, useEffect, useState } from "react"

export const useAuth = () => {
  const [token, setToken] = useState<null | string>(null)
  const [isDoneAuth, setDoneAuth] = useState<boolean>(false)
  const [userId, setUserId] = useState<null | string>(null)

  const login = useCallback((jwtKey: string, id: string) => {
    setToken(jwtKey)
    setUserId(id)

    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: id,
        token: jwtKey,
      })
    )
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem("userData")
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData") || "")
    if (data && data.token && data.userId) {
      login(data.token, data.userId)
    }

    setDoneAuth(true)
  }, [login])

  return { login, logout, token, userId, isDoneAuth }
}
