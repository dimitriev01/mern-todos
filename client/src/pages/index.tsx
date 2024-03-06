import { LoginPage } from "./login"
import { RegistrationPage } from "./registration"
import { ReactNode } from "react"
import { DetailTodoPage } from "./detail-todo"
import Main from "./main/ui/main"
import { EnumRoutesName, routes } from "shared/lib/routes"

export interface ICustomRouteProps {
  path: string
  element: ReactNode
  isAuth: () => boolean
}

export const pages: Record<EnumRoutesName, ICustomRouteProps> = {
  [EnumRoutesName.MAIN]: {
    path: routes.main,
    element: <Main />,
    isAuth: () => !!localStorage.getItem("userData"),
  },
  [EnumRoutesName.DETAIL_TODO]: {
    path: routes.todo,
    element: <DetailTodoPage />,
    isAuth: () => !!localStorage.getItem("userData"),
  },
  [EnumRoutesName.LOGIN]: {
    path: routes.login,
    element: <LoginPage />,
    isAuth: () => !localStorage.getItem("userData"),
  },
  [EnumRoutesName.REGISTER]: {
    path: routes.register,
    element: <RegistrationPage />,
    isAuth: () => !localStorage.getItem("userData"),
  },
}
