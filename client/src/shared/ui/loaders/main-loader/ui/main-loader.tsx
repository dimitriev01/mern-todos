import clsx from "clsx"
import cls from "./main-loader.module.scss"
import { Loader } from "../../loader"

export const MainLoader = () => {
  return (
    <div className={clsx(cls.mainLoader)}>
      <Loader />
    </div>
  )
}
