import { useEffect } from "react"
import { useMediaQuery } from "./use-media-query"

export const useBodyOverflow = (state: boolean) => {
  const isTablet = useMediaQuery("(max-width: 1024px)")

  useEffect(() => {
    if (isTablet && state) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [state, isTablet])

  return null
}
