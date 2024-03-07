import { pages } from "pages"
import { Suspense } from "react"
import { Router, RouterProvider } from "shared/lib/routes"
import { MainLoader } from "shared/ui/loaders"
import { Toast } from "shared/ui/toast"
import { Layout } from "widgets/layout"
import { AuthContext } from "./context"
import { useAuth } from "shared/lib/hooks"

const App = () => {
  const { token, login, logout, userId, isDoneAuth } = useAuth()
  const isAuth = Boolean(token)

  if (!isDoneAuth) {
    return <MainLoader />
  }

  return (
    <AuthContext.Provider value={{ isAuth, logout, token, login, userId }}>
      <RouterProvider>
        <Layout>
          <Toast />
          <Suspense fallback={<MainLoader />}>
            <Router pages={pages} isAuth={isAuth} />
          </Suspense>
        </Layout>
      </RouterProvider>
    </AuthContext.Provider>
  )
}

export default App
