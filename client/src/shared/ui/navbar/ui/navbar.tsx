import { AuthContext } from "app/context"
import { useContext } from "react"
import { Link } from "react-router-dom"

export const Navbar = () => {
  const auth = useContext(AuthContext)

  const logoutHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    auth.logout()
  }

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo left">
          Logo
        </Link>
        <ul className="right">
          {auth.userId ? (
            <li>
              <Link
                className="waves-effect waves-light btn-small"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => logoutHandler(e)}
                to={"/login"}
              >
                Выйти
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link className="waves-effect waves-light btn-small" to="/register">
                  Зарегаться
                </Link>
              </li>
              <li>
                <Link className="waves-effect waves-light btn-small" to="/login">
                  Залогиниться{" "}
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}
