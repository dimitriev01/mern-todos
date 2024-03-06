import { Navigate, Route, Routes } from "react-router-dom"
import { EnumRoutesName, routes } from "../model/routes"
import { ICustomRouteProps } from "pages"

interface IRouterProps {
  pages: Record<EnumRoutesName, ICustomRouteProps>
  isAuth: boolean
}

export const Router = (props: IRouterProps) => {
  const { pages, isAuth } = props
  const availableRoutes = Object.values(pages).filter(page => page.isAuth())

  return (
    <Routes>
      {availableRoutes.map(page => (
        <Route key={`route_${page.path}`} path={page.path} element={page.element} />
      ))}
      <Route
        key={`route_default`}
        path="*"
        element={<Navigate to={isAuth ? routes.main : routes.login} />}
      />
    </Routes>
  )
}
