import { createContext } from "react"

interface IAuthContext {
  token: string | null
  userId: string | null
  login: (jwtKey: string, id: string) => void
  logout: () => void
  isAuth: boolean
}

export const AuthContext = createContext<IAuthContext>({
  token: null,
  userId: null,
  login: () => {},
  logout: () => {},
  isAuth: false,
})
