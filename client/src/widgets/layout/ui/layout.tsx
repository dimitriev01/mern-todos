import { ReactNode } from "react"
import { Navbar } from "shared/ui/navbar"

interface ILayoutProps {
  children: ReactNode
}

export default function Layout(props: ILayoutProps) {
  const { children } = props

  return (
    <div>
      <Navbar />
      <main style={{ margin: 20 }}>{children}</main>
    </div>
  )
}
