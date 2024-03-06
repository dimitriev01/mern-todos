import { useCallback } from "react"
import { toast } from "react-toastify"
import { TypeResponse } from "shared/api"

export const useToast = () => {
  return useCallback((text: TypeResponse, setText: (text: TypeResponse) => void) => {
    if (text) {
      const isError = text.status === "error"
      if (isError) {
        if (typeof text.errors[0] === "string") {
          toast.error(text.errors[0])
        } else {
          toast.error(text.errors[0].msg)
        }
        setText("")
      }
      const isSuccess = text.status === "ok"
      if (isSuccess) {
        toast.success(text.message)
        setText("")
      }
    }
  }, [])
}
