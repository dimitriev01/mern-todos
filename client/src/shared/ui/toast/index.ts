import { lazy } from "react"

export type { IToastStore } from "./model/toast.types"
export const Toast = lazy(() => import("./ui/toast"))
