import * as React from "react"
import ToastLabel from "components/toast"
import toast from "react-hot-toast"

const useToaster = () => {
  return (text: string) => {
    toast.custom((t) => <ToastLabel>{text}</ToastLabel>)
  }
}
export default useToaster
