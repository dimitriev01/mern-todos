import { memo } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./toast.scss"

export const CustomToast = memo(() => (
  <div className="custom-toast">
    <ToastContainer
      position="top-right"
      autoClose={10000}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  </div>
))

export default CustomToast
