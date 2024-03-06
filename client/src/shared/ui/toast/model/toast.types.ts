import { TypeResponse } from "shared/api"

export interface IToastStore {
  text: TypeResponse
  setText: (toast: TypeResponse) => void
}
