import { useEffect } from "react"

export const useOutsideClick = (
  ref: React.RefObject<HTMLElement>,
  handleClick: () => void,
  active = true,
  extraId?: string
) => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target) && active) {
        const elem = extraId ? document.getElementById(extraId) : undefined

        if (elem) {
          if (!elem.contains(event.target)) {
            handleClick()
          }
        } else {
          handleClick()
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [handleClick, ref, active, extraId])
}
